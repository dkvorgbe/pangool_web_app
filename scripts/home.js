// Home page interactions - Geometric visualization

document.addEventListener('DOMContentLoaded', () => {
    
    
    // insert the pangol_diamont html code into the geometric-container 
    // fetch('../pangol_diamond.html')
    //   .then(r => r.text())
    //   .then(svg => {
    //     console.log(svg);
    //     document.getElementById('geometric-container').innerHTML = svg;
    //     console.log(document.getElementById('geometric-container'));
    //   })
    //   .catch(err => console.error('Error loading SVG:', err));
    
    // Set current date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        dateElement.textContent = `${day}.${month}.${year}`;
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

    // Add visual feedback for focus
    geometricContainer.addEventListener('focus', () => {
        geometricContainer.style.outline = '2px solid rgba(255, 0, 0, 0.5)';
    });

    geometricContainer.addEventListener('blur', () => {
        geometricContainer.style.outline = 'none';
    });
});

