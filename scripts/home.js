// Home page interactions - Geometric visualization

document.addEventListener('DOMContentLoaded', () => {
    
    // Set current date and day
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    
    if (dateElement) {
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        dateElement.textContent = `${day}.${month}.${year}`;
    }
    
    // Set current day of the week
    const dayElement = document.getElementById('current-day');

    if (dayElement) {
        const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        dayElement.textContent = dayOfWeek;
    }

    // Get geometric container and vertices
    const geometricContainer = document.getElementById('geometric-container');
    const vertices = document.querySelectorAll('.vertex');
    const mainShape = document.getElementById('main-shape');

    // Add hover effect to individual vertices
    vertices.forEach(vertex => {
        vertex.addEventListener('mouseenter', () => {
            const label = vertex.getAttribute('data-label');
            vertex.style.opacity = '1';
            // Optionally log which vertex is being hovered
            console.log(`Hovering over: ${label}`);
        });

        vertex.addEventListener('mouseleave', () => {
            vertex.style.opacity = '0.8';
        });
    });

    // Click handler for geometric shape - navigate to diviner page
    geometricContainer.addEventListener('click', () => {
        // Add a subtle click animation
        mainShape.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            window.location.href = 'diviner.html';
        }, 150);
    });

    // Add keyboard accessibility
    geometricContainer.setAttribute('tabindex', '0');
    geometricContainer.setAttribute('role', 'button');
    geometricContainer.setAttribute('aria-label', 'Enter divination interface');

    geometricContainer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.location.href = 'diviner.html';
        }
    });


    const vid = document.getElementById('background-video');
    vid.addEventListener('ended', () => {
        console.log('Video ended');
        vid.playbackRate *= -1;
        vid.play();
    });

    // Tooltip functionality for vertices
    initializeTooltips();
});

function initializeTooltips() {
    // Tooltip data with descriptions for each element
    const tooltipData = {
        'roog': 'ROOG - The Supreme Being in Serer cosmology, creator of the universe and source of all life.',
        'maam': 'MAAM - The ancestral spirits and guardians, connecting the living with the divine realm.',
        'okiin': 'OKIIN - The sacred center, representing balance and the meeting point of cosmic forces.',
        'moon': 'MOON - Symbol of feminine energy, cycles, and the mysteries of the night.',
        'sun': 'SUN - Symbol of masculine energy, vitality, and the life-giving force of day.'
    };

    const tooltip = document.getElementById('vertex-tooltip');
    const tooltipContent = tooltip.querySelector('.tooltip-content');

    // Wait for SVG to load, then attach event listeners
    setTimeout(() => {
        Object.keys(tooltipData).forEach(elementId => {
            const element = document.getElementById(elementId);
            
            if (element) {
                // Add cursor pointer style
                element.style.cursor = 'pointer';

                element.addEventListener('mouseenter', (e) => {
                    showTooltip(e, elementId, tooltipData[elementId]);
                });

                element.addEventListener('mousemove', (e) => {
                    positionTooltip(e);
                });

                element.addEventListener('mouseleave', () => {
                    hideTooltip();
                });
            }
        });
    }, 500); // Wait for SVG to be loaded into DOM

    function showTooltip(event, elementId, text) {
        tooltipContent.textContent = text;
        tooltip.classList.remove('hidden');
        tooltip.classList.add('visible');
        positionTooltip(event);
    }

    function positionTooltip(event) {
        const tooltipRect = tooltip.getBoundingClientRect();
        const offset = 20;
        
        let left = event.clientX;
        let top = event.clientY - tooltipRect.height - offset;

        // Adjust if tooltip goes off screen
        if (left + tooltipRect.width > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        if (top < 0) {
            top = event.clientY + offset;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    function hideTooltip() {
        tooltip.classList.remove('visible');
        setTimeout(() => {
            if (!tooltip.classList.contains('visible')) {
                tooltip.classList.add('hidden');
            }
        }, 300); // Match transition duration
    }
}




