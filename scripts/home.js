// // Home page interactions - Geometric visualization

// document.addEventListener('DOMContentLoaded', () => {
    
    
//     // insert the pangol_diamont html code into the geometric-container 
//     // fetch('../pangol_diamond.html')
//     //   .then(r => r.text())
//     //   .then(svg => {
//     //     console.log(svg);
//     //     document.getElementById('geometric-container').innerHTML = svg;
//     //     console.log(document.getElementById('geometric-container'));
//     //   })
//     //   .catch(err => console.error('Error loading SVG:', err));
    
//     // Set current date
//     const dateElement = document.getElementById('current-date');
//     if (dateElement) {
//         const today = new Date();
//         const day = String(today.getDate()).padStart(2, '0');
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const year = today.getFullYear();
//         dateElement.textContent = `${day}.${month}.${year}`;
//     }

//     // Get geometric container and vertices
//     const geometricContainer = document.getElementById('geometric-container');
//     const vertices = document.querySelectorAll('.vertex');
//     const mainShape = document.getElementById('main-shape');

//     // Add hover effect to individual vertices
//     vertices.forEach(vertex => {
//         vertex.addEventListener('mouseenter', () => {
//             const label = vertex.getAttribute('data-label');
//             vertex.style.opacity = '1';
//             // Optionally log which vertex is being hovered
//             console.log(`Hovering over: ${label}`);
//         });

//         vertex.addEventListener('mouseleave', () => {
//             vertex.style.opacity = '0.8';
//         });
//     });

//     // Click handler for geometric shape - navigate to diviner page
//     geometricContainer.addEventListener('click', () => {
//         // Add a subtle click animation
//         mainShape.style.transform = 'scale(0.95)';
        
//         setTimeout(() => {
//             window.location.href = 'diviner.html';
//         }, 150);
//     });

//     // Add keyboard accessibility
//     geometricContainer.setAttribute('tabindex', '0');
//     geometricContainer.setAttribute('role', 'button');
//     geometricContainer.setAttribute('aria-label', 'Enter divination interface');

//     geometricContainer.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             window.location.href = 'diviner.html';
//         }
//     });

//     // Add visual feedback for focus
//     geometricContainer.addEventListener('focus', () => {
//         geometricContainer.style.outline = '2px solid rgba(255, 0, 0, 0.5)';
//     });

//     geometricContainer.addEventListener('blur', () => {
//         geometricContainer.style.outline = 'none';
//     });
// });


// Home page interactions - Geometric visualization

document.addEventListener('DOMContentLoaded', () => {
    // Set current date (DD.MM.YYYY)
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      dateElement.textContent = `${day}.${month}.${year}`;
    }
  
    // --- Build and inject interactive SVG diamond ---
    const container = document.getElementById('geometric-container');
  
    // Responsive SVG wrapper with glow + styles. Geometry is rendered below.
    container.innerHTML = `
    <svg id="diamond" viewBox="0 0 1000 1200" role="img" aria-label="Interactive diamond"
         class="w-full h-auto transition-transform duration-300 ease-out select-none">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <style>
          .edge { stroke:#ff5b5b; stroke-width:2; vector-effect:non-scaling-stroke; filter:url(#glow); }
          .edge.active, .vertex.active { stroke-width:4; }
          .vertex { fill:#ff5b5b; filter:url(#glow); }
          .hit-edge { stroke:transparent; stroke-width:16; cursor:pointer; }
          .hit-vertex { fill:transparent; cursor:pointer; }
          text.label { fill:#fca5a5; font:12px/1.2 ui-sans-serif, system-ui; user-select:none; }
          g[tabindex]:focus .edge, g[tabindex]:focus .vertex { stroke:#fff; fill:#fff; }
        </style>
      </defs>
      <g id="edges"></g>
      <g id="vertices"></g>
    </svg>
    `;
  
    const svg = document.getElementById('diamond');
    const vb = svg.viewBox.baseVal;
  
    // Normalized coordinates (0..1)
    const POINTS = {
      top:    [0.50, 0.10],
      right:  [0.90, 0.45],
      bottom: [0.50, 0.95],
      left:   [0.10, 0.45],
      midL:   [0.35, 0.42],
      midR:   [0.65, 0.58],
      midH:   [0.50, 0.55],
    };
  
    const EDGES = [
      // outer diamond
      ['top','right'],['right','bottom'],['bottom','left'],['left','top'],
      // internals (tune as desired)
      ['left','midH'],['midH','right'],['top','midH'],['bottom','midH'],
      ['top','midL'],['midL','right'],['left','midR'],['midR','bottom']
    ];
  
    const edgesG = svg.querySelector('#edges');
    const verticesG = svg.querySelector('#vertices');
  
    function xy([nx, ny]) {
      return [nx * vb.width, ny * vb.height];
    }
  
    // Render edges with separate wide hit-lines
    EDGES.forEach(([a, b]) => {
      const [x1, y1] = xy(POINTS[a]);
      const [x2, y2] = xy(POINTS[b]);
  
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('tabindex', '0');
      group.dataset.edge = `${a}-${b}`;
  
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('class', 'edge');
  
      const hit = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      hit.setAttribute('x1', x1); hit.setAttribute('y1', y1);
      hit.setAttribute('x2', x2); hit.setAttribute('y2', y2);
      hit.setAttribute('class', 'hit-edge');
  
      group.append(line, hit);
      edgesG.appendChild(group);
    });
  
    // Render vertices with labels and bigger hit-zones
    Object.entries(POINTS).forEach(([id, pt]) => {
      const [x, y] = xy(pt);
  
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('tabindex', '0');
      g.dataset.vertex = id;
  
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', x); dot.setAttribute('cy', y);
      dot.setAttribute('r', '6');
      dot.setAttribute('class', 'vertex');
  
      const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      hit.setAttribute('cx', x); hit.setAttribute('cy', y);
      hit.setAttribute('r', '16');
      hit.setAttribute('class', 'hit-vertex');
  
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', x + 10); label.setAttribute('y', y - 10);
      label.setAttribute('class', 'label');
      label.textContent = id;
  
      g.append(dot, hit, label);
      verticesG.appendChild(g);
    });
  
    // Interactions
    function activate(g, on) {
      g.querySelectorAll('.edge,.vertex').forEach(el =>
        el.classList.toggle('active', on)
      );
    }
  
    function goDiviner(target) {
      // swap this for custom routing per edge/vertex if needed
      window.location.href = 'diviner.html';
    }
  
    svg.querySelectorAll('g[tabindex]').forEach(g => {
      g.addEventListener('mouseenter', () => activate(g, true));
      g.addEventListener('mouseleave', () => activate(g, false));
      g.addEventListener('click', () => goDiviner(g));
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goDiviner(g);
        }
      });
    });
  
    // Container focus outline for accessibility
    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'button');
    container.setAttribute('aria-label', 'Enter divination interface');
    container.addEventListener('focus', () => {
      container.style.outline = '2px solid rgba(255, 0, 0, 0.5)';
    });
    container.addEventListener('blur', () => {
      container.style.outline = 'none';
    });
  });
  