/* ==========================================================================
   亞歷山大技巧 AI 架站指南 - 互動邏輯 (Javascript)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 導覽列滾動效果 (Navbar Scroll effect)
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. 複製 Bluehost 備份提示詞功能 (Copy prompt function)
    window.copyPrompt = function() {
        const promptText = document.getElementById('promptText').innerText;
        const copyBtnText = document.getElementById('copyBtnText');
        
        navigator.clipboard.writeText(promptText).then(() => {
            // 複製成功時的優雅反饋動畫
            const originalText = "複製提示詞";
            copyBtnText.innerText = "已複製！將其貼給您的 AI 吧 ✨";
            
            // 按鈕本身的微小震動或變色
            const btn = document.querySelector('.btn-copy');
            btn.style.backgroundColor = 'var(--accent-color)';
            btn.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                copyBtnText.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.transform = '';
            }, 3000);
        }).catch(err => {
            console.error('無法複製文字: ', err);
            // 備用方案
            alert("複製失敗，請手動複製該提示詞");
        });
    };

    // 3. 實作 Intersection Observer 做淡入效果 (Fade-in animations on scroll)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 停止觀察該元素，確保動畫只播一次
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 觀察 timeline 節點
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        // 先加上初始的 opacity-0 與 transition 樣式
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        
        fadeInObserver.observe(item);
    });

    // 觀察章節區塊的文字與內容
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        fadeInObserver.observe(section);
    });

    // 為了配合 Observer，在 CSS 之外以 JS 動態控制顯示
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .timeline-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .content-section {
            opacity: 0.3;
            transform: translateY(20px);
            transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .content-section.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
});
