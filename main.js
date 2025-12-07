// Stars and comets animation for main page
const starsCanvas = document.getElementById('starsCanvas');
const cometsCanvas = document.getElementById('cometsCanvas');

if (starsCanvas && cometsCanvas) {
    const starsCtx = starsCanvas.getContext('2d');
    const cometsCtx = cometsCanvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
        cometsCanvas.width = window.innerWidth;
        cometsCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Stars
    const stars = [];
    const numStars = 200;
    
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            radius: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            twinkle: Math.random() * Math.PI * 2
        });
    }
    
    function drawStars() {
        starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        starsCtx.fillStyle = '#ffd700';
        
        stars.forEach(star => {
            star.twinkle += 0.02;
            const opacity = star.opacity + Math.sin(star.twinkle) * 0.3;
            starsCtx.globalAlpha = Math.max(0.1, Math.min(1, opacity));
            starsCtx.beginPath();
            starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            starsCtx.fill();
        });
        
        starsCtx.globalAlpha = 1;
    }
    
    // Comets (falling stars at 45 degrees)
    const comets = [];
    const cometSpeed = 2;
    
    function createComet() {
        const side = Math.random() < 0.5 ? 'left' : 'top';
        let x, y;
        
        if (side === 'left') {
            x = -50;
            y = Math.random() * cometsCanvas.height;
        } else {
            x = Math.random() * cometsCanvas.width;
            y = -50;
        }
        
        comets.push({
            x: x,
            y: y,
            length: Math.random() * 100 + 50,
            speed: Math.random() * cometSpeed + cometSpeed,
            opacity: Math.random() * 0.5 + 0.5
        });
    }
    
    function checkStarNearBoxes() {
        const mainFrame = document.querySelector('.main-frame');
        const navLinks = document.querySelectorAll('.nav-link');
        const blurElements = new Set();
        
        // Check comets
        comets.forEach(comet => {
            navLinks.forEach(link => {
                const rect = link.getBoundingClientRect();
                
                if (comet.x >= rect.left - 50 && comet.x <= rect.right + 50 &&
                    comet.y >= rect.top - 50 && comet.y <= rect.bottom + 50) {
                    blurElements.add(link);
                }
            });
            
            if (mainFrame) {
                const rect = mainFrame.getBoundingClientRect();
                
                if (comet.x >= rect.left - 50 && comet.x <= rect.right + 50 &&
                    comet.y >= rect.top - 50 && comet.y <= rect.bottom + 50) {
                    blurElements.add(mainFrame);
                }
            }
        });
        
        // Check stars
        stars.forEach(star => {
            navLinks.forEach(link => {
                const rect = link.getBoundingClientRect();
                
                if (star.x >= rect.left - 30 && star.x <= rect.right + 30 &&
                    star.y >= rect.top - 30 && star.y <= rect.bottom + 30) {
                    blurElements.add(link);
                }
            });
            
            if (mainFrame) {
                const rect = mainFrame.getBoundingClientRect();
                
                if (star.x >= rect.left - 30 && star.x <= rect.right + 30 &&
                    star.y >= rect.top - 30 && star.y <= rect.bottom + 30) {
                    blurElements.add(mainFrame);
                }
            }
        });
        
        // Apply blur to elements with stars nearby
        navLinks.forEach(link => {
            if (blurElements.has(link)) {
                link.classList.add('star-blur');
            } else {
                link.classList.remove('star-blur');
            }
        });
        
        if (mainFrame) {
            if (blurElements.has(mainFrame)) {
                mainFrame.classList.add('star-blur');
            } else {
                mainFrame.classList.remove('star-blur');
            }
        }
    }
    
    function drawComets() {
        cometsCtx.clearRect(0, 0, cometsCanvas.width, cometsCanvas.height);
        
        comets.forEach((comet, index) => {
            comet.x += comet.speed;
            comet.y += comet.speed;
            
            // Draw comet trail
            const gradient = cometsCtx.createLinearGradient(
                comet.x - comet.length,
                comet.y - comet.length,
                comet.x,
                comet.y
            );
            gradient.addColorStop(0, `rgba(255, 215, 0, 0)`);
            gradient.addColorStop(0.5, `rgba(255, 215, 0, ${comet.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(255, 215, 0, ${comet.opacity})`);
            
            cometsCtx.strokeStyle = gradient;
            cometsCtx.lineWidth = 2;
            cometsCtx.beginPath();
            cometsCtx.moveTo(comet.x - comet.length, comet.y - comet.length);
            cometsCtx.lineTo(comet.x, comet.y);
            cometsCtx.stroke();
            
            // Draw comet head
            cometsCtx.fillStyle = `rgba(255, 215, 0, ${comet.opacity})`;
            cometsCtx.beginPath();
            cometsCtx.arc(comet.x, comet.y, 3, 0, Math.PI * 2);
            cometsCtx.fill();
            
            // Remove if off screen
            if (comet.x > cometsCanvas.width + 100 || comet.y > cometsCanvas.height + 100) {
                comets.splice(index, 1);
            }
        });
        
        // Check if stars/comets are near boxes
        checkStarNearBoxes();
        
        // Create new comets occasionally
        if (Math.random() < 0.02) {
            createComet();
        }
    }
    
    function animate() {
        drawStars();
        drawComets();
        requestAnimationFrame(animate);
    }
    
    animate();
    createComet(); // Initial comet
}
