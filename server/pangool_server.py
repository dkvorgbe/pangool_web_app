#!/usr/bin/env python3
"""
Pangool Divination Server

Serves the web app and proxies divination requests to Ollama.
Calls the fine-tuned model 4 times (one per section) and returns
structured JSON that the web app expects.

Usage:
    python pangool_server.py [--port 8080] [--ollama-url http://localhost:11434]
"""

import argparse
import json
import http.server
import urllib.request
import urllib.error
import os
import random

# Theme pools for each divination section
SECTION_THEMES = {
    "heart": ["Love", "Family", "Loyalty", "Compassion", "Forgiveness", "Friendship", "Generosity", "Gratitude"],
    "head": ["Wisdom", "Truth", "Knowledge", "Patience", "Deception", "Cunning", "Foresight", "Memory"],
    "soul": ["Faith", "Destiny", "Ancestors", "Humility", "Silence", "Dreams", "Ritual", "Sacred"],
    "flesh": ["Mortality", "Courage", "Strength", "Hunger", "Labour", "Healing", "Endurance", "Age"],
}

OLLAMA_URL = "http://localhost:11434"
MODEL_NAME = "pangool"


def generate_proverb(theme: str) -> str:
    """Call Ollama to generate a single proverb for a theme."""
    payload = json.dumps({
        "model": MODEL_NAME,
        "prompt": theme,
        "stream": False,
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{OLLAMA_URL}/api/generate",
        data=payload,
        headers={"Content-Type": "application/json"},
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("response", "").strip()
    except (urllib.error.URLError, TimeoutError) as e:
        print(f"Ollama error for theme '{theme}': {e}")
        return ""


def generate_divination() -> dict:
    """Generate a full divination with 4 sections."""
    result = {}
    for section, themes in SECTION_THEMES.items():
        theme = random.choice(themes)
        proverb = generate_proverb(theme)
        if proverb:
            result[section] = proverb
        else:
            result[section] = "The spirits are silent on this matter. Ask again."
    return result


class PangoolHandler(http.server.SimpleHTTPRequestHandler):
    """Serves static files and handles /divination-all API endpoint."""

    web_root = None

    def do_POST(self):
        if self.path == "/divination-all":
            self.handle_divination()
        else:
            self.send_error(404, "Not Found")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def handle_divination(self):
        try:
            divination = generate_divination()

            response = json.dumps(divination).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()
            self.wfile.write(response)

        except Exception as e:
            error = json.dumps({"error": str(e)}).encode("utf-8")
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(error)))
            self.end_headers()
            self.wfile.write(error)

    def translate_path(self, path):
        """Serve files from the web app root directory."""
        if self.web_root:
            # Strip leading slash and join with web root
            rel_path = path.lstrip("/")
            return os.path.join(self.web_root, rel_path)
        return super().translate_path(path)

    def log_message(self, format, *args):
        """Quieter logging."""
        print(f"[{self.log_date_time_string()}] {format % args}")


def main():
    parser = argparse.ArgumentParser(description="Pangool Divination Server")
    parser.add_argument("--port", type=int, default=8080, help="Server port (default: 8080)")
    parser.add_argument("--ollama-url", type=str, default="http://localhost:11434", help="Ollama API URL")
    parser.add_argument("--web-root", type=str, default=None, help="Path to web app directory (default: parent of server/)")
    args = parser.parse_args()

    global OLLAMA_URL
    OLLAMA_URL = args.ollama_url

    # Default web root is the parent directory (pangool_web_app/)
    web_root = args.web_root or os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    PangoolHandler.web_root = web_root

    server = http.server.HTTPServer(("0.0.0.0", args.port), PangoolHandler)
    print(f"Pangool Divination Server")
    print(f"  Web app:  http://0.0.0.0:{args.port}")
    print(f"  Ollama:   {OLLAMA_URL}")
    print(f"  Web root: {web_root}")
    print(f"  API:      http://0.0.0.0:{args.port}/divination-all")
    print(f"\nAccess from iPad at: http://<mac-mini-ip>:{args.port}")
    print(f"Press Ctrl+C to stop.\n")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        server.shutdown()


if __name__ == "__main__":
    main()
