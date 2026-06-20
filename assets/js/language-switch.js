
document.addEventListener('DOMContentLoaded', function() {
    const languageMap = {
        'index.html': 'index-en.html',
        'index-en.html': 'index.html',
        'terms.html': 'terms-en.html',
        'terms-en.html': 'terms.html',
        'privacy-policy-ja.html': 'privacy-policy.html',
        'privacy-policy.html': 'privacy-policy-ja.html',
        'support.html': 'support-en.html',
        'support-en.html': 'support.html'
    };

    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename || 'index.html';
    }

    function getCurrentLanguage() {
        const currentPage = getCurrentPage();
        if (currentPage.includes('-en') || currentPage === 'privacy-policy.html') {
            return 'en';
        }
        return 'ja';
    }

    function pairedPage(currentPage, targetLang) {
        const mapped = languageMap[currentPage];
        if (!mapped) {
            return currentPage;
        }
        const mappedIsEn = mapped.includes('-en') || mapped === 'privacy-policy.html';
        if (targetLang === 'en') {
            return mappedIsEn ? mapped : currentPage;
        }
        return mappedIsEn ? currentPage : mapped;
    }

    function switchLanguage(targetLang) {
        const currentPage = getCurrentPage();
        const targetPage = pairedPage(currentPage, targetLang);

        if (targetPage && targetPage !== currentPage) {
            window.location.href = targetPage;
        }
    }

    function initLanguageToggle() {
        const jaButton = document.getElementById('lang-ja');
        const enButton = document.getElementById('lang-en');
        
        if (!jaButton || !enButton) {
            return;
        }

        const currentLang = getCurrentLanguage();
        
        if (currentLang === 'ja') {
            jaButton.classList.add('active');
            enButton.classList.remove('active');
        } else {
            enButton.classList.add('active');
            jaButton.classList.remove('active');
        }

        jaButton.addEventListener('click', function(e) {
            e.preventDefault();
            switchLanguage('ja');
        });

        enButton.addEventListener('click', function(e) {
            e.preventDefault();
            switchLanguage('en');
        });
    }

    function initNavigation() {
        const currentPage = getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href === currentPage || href === './' + currentPage)) {
                link.classList.add('active');
            }
        });
    }

    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initLanguageToggle();
    initNavigation();
    initSmoothScrolling();

    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'j') {
            e.preventDefault();
            switchLanguage('ja');
        }
        if (e.altKey && e.key === 'e') {
            e.preventDefault();
            switchLanguage('en');
        }
    });
});
