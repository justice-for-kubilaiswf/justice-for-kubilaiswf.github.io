document.addEventListener("DOMContentLoaded", function() {
    const phrases = [
        "junior developer",
        "software enthusiast",
        "web designer",
        "AI/ML enthusiast",
        "computer engineer",
        "WW2 history buff"
    ];
    
    const typingSpeed = 80;
    const erasingSpeed = 40;
    const delayBetweenPhrases = 1500;
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    const textElement = document.getElementById("typing-text");
    
    function typeText() {
        if (isTyping) {
            if (charIndex < phrases[phraseIndex].length) {
                textElement.textContent += phrases[phraseIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                isTyping = false;
                setTimeout(typeText, delayBetweenPhrases);
            }
        } else {
            if (charIndex > 0) {
                textElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeText, erasingSpeed);
            } else {
                isTyping = true;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeText, typingSpeed);
            }
        }
    }
    
    typeText();
    
    const animatedTitle = document.querySelector('.animated-title');
    if (animatedTitle) {
        animatedTitle.classList.add('show');
    }
});
