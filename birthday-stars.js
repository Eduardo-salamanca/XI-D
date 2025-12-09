// Falling stars animation for birthday and schedule pages (star shape with shadow)
const starsCanvas = document.getElementById('starsCanvas');
const cometsCanvas = document.getElementById('cometsCanvas');

if (starsCanvas && cometsCanvas) {
    const starsCtx = starsCanvas.getContext('2d');
    const cometsCtx = cometsCanvas.getContext('2d');
    
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
    
    // Draw star shape
    function drawStarShape(ctx, x, y, size, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4); // 45 degree rotation
        
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size * 0.4;
        let rot = Math.PI / 2 * 3;
        let xPos = 0;
        let yPos = 0;
        let step = Math.PI / spikes;
        
        ctx.beginPath();
        ctx.moveTo(0, 0 - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            xPos = Math.cos(rot) * outerRadius;
            yPos = Math.sin(rot) * outerRadius;
            ctx.lineTo(xPos, yPos);
            rot += step;
            
            xPos = Math.cos(rot) * innerRadius;
            yPos = Math.sin(rot) * innerRadius;
            ctx.lineTo(xPos, yPos);
            rot += step;
        }
        
        ctx.lineTo(0, 0 - outerRadius);
        ctx.closePath();
        
        // Shadow trace
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${opacity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(255, 215, 0, ${opacity * 0.1})`);
        gradient.addColorStop(1, `rgba(255, 215, 0, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Star fill
        ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`;
        ctx.fill();
        
        ctx.restore();
    }
    
    // Falling stars (star shapes at 45 degrees)
    const fallingStars = [];
    const starSpeed = 2.5;
    
    function createFallingStar() {
        const side = Math.random() < 0.5 ? 'left' : 'top';
        let x, y;
        
        if (side === 'left') {
            x = -100;
            y = Math.random() * cometsCanvas.height;
        } else {
            x = Math.random() * cometsCanvas.width;
            y = -100;
        }
        
        fallingStars.push({
            x: x,
            y: y,
            size: Math.random() * 15 + 10,
            speed: Math.random() * starSpeed + starSpeed,
            opacity: Math.random() * 0.6 + 0.4,
            rotation: Math.PI / 4 // 45 degrees
        });
    }
    
    function drawFallingStars() {
        cometsCtx.clearRect(0, 0, cometsCanvas.width, cometsCanvas.height);
        
        fallingStars.forEach((star, index) => {
            star.x += star.speed;
            star.y += star.speed;
            
            // Draw beautiful shadow trace (no line, just shadow effect)
            const trailLength = star.size * 6;
            const trailSteps = 15;
            
            for (let i = 0; i < trailSteps; i++) {
                const t = i / trailSteps;
                const trailX = star.x - trailLength * t;
                const trailY = star.y - trailLength * t;
                const trailSize = star.size * (1 - t * 0.7);
                const trailOpacity = star.opacity * (1 - t) * 0.4;
                
                // Draw shadow star shape
                cometsCtx.save();
                cometsCtx.globalAlpha = trailOpacity;
                cometsCtx.shadowBlur = 15;
                cometsCtx.shadowColor = `rgba(255, 215, 0, ${trailOpacity * 2})`;
                drawStarShape(cometsCtx, trailX, trailY, trailSize, trailOpacity);
                cometsCtx.restore();
            }
            
            // Draw main star shape with glow
            cometsCtx.save();
            cometsCtx.shadowBlur = 25;
            cometsCtx.shadowColor = `rgba(255, 215, 0, ${star.opacity})`;
            drawStarShape(cometsCtx, star.x, star.y, star.size, star.opacity);
            cometsCtx.restore();
            
            // Remove if off screen
            if (star.x > cometsCanvas.width + 200 || star.y > cometsCanvas.height + 200) {
                fallingStars.splice(index, 1);
            }
        });
        
        // Create new falling stars occasionally
        if (Math.random() < 0.015) {
            createFallingStar();
        }
    }
    
    function animate() {
        drawStars();
        drawFallingStars();
        requestAnimationFrame(animate);
    }
    
    animate();
    createFallingStar(); // Initial falling star
}
