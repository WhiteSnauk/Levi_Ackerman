// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.preloader-progress');

    // Анимация прогресса
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Скрываем прелоадер
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.style.cursor = 'default';

                // Запускаем анимации после загрузки
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 500);
        }
        progressBar.style.transform = `translateX(${progress - 100}%)`;
    }, 100);
});

// Аудио фразы Леви
const leviPhrases = [
    {
        text: "Решения, которые ты не можешь принять... Иногда они оказываются не такими уж и плохими.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "Пожертвуйте своими сердцами!",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "В этом мире жестокости нет места сомнениям.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "Я сделаю всё, что в моих силах. Как всегда.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "Иногда чтобы победить, нужно пойти на жертвы.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "Не важно, насколько силён враг. Важно - насколько сильна твоя воля.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "Чистота - залог успеха в бою и в жизни.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "Я буду сражаться до последнего вздоха.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "Сила не в мышцах, а в решимости духа.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    },
    {
        text: "Каждый выбор имеет свою цену.",
        audio: "https://www.soundjay.com/button/beep-07.wav"
    }
];

// Функция для воспроизведения случайной фразы
function playRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * leviPhrases.length);
    const phrase = leviPhrases[randomIndex];

    // Показываем субтитры
    showSubtitles(phrase.text);

    // Воспроизводим звуковой эффект
    playBeep();
}

// Функция для показа субтитров
function showSubtitles(text) {
    const subtitles = document.getElementById('subtitles');
    if (!subtitles) return;

    subtitles.textContent = `"${text}"`;
    subtitles.classList.add('show');

    // Скрываем субтитры через 4 секунды
    setTimeout(() => {
        subtitles.classList.remove('show');
    }, 4000);
}

// Временная функция для звукового сигнала
function playBeep() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 600;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.8);
    } catch (e) {
        console.log('Audio context not supported:', e);
    }
}

// Custom cursor
function initCursor() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Эффект при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, .btn, .gallery-card, .skill-card, .form-input, .clickable-image, .detail-card, .member-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, #e74c3c, transparent)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #3498db, transparent)';
        });
    });
}

// Eye follow effect (эффект следящих глаз)
function initEyeFollow() {
    const profileImg = document.querySelector('.profile-img');

    document.addEventListener('mousemove', (e) => {
        if (!profileImg) return;

        const rect = profileImg.getBoundingClientRect();
        const imgCenterX = rect.left + rect.width / 2;
        const imgCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - imgCenterY, e.clientX - imgCenterX);
        const distance = Math.min(100, Math.sqrt(
            Math.pow(e.clientX - imgCenterX, 2) +
            Math.pow(e.clientY - imgCenterY, 2)
        ) / 10);

        // Создаем эффект "следящего взгляда" через фильтры и трансформации
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        profileImg.style.transform = `translate(${moveX * 0.1}px, ${moveY * 0.1}px) rotate(${moveX * 0.01}deg) scale(1.02)`;
        profileImg.style.filter = `hue-rotate(${moveX * 0.5}deg) brightness(${1 + moveY * 0.001}) contrast(${1.1 + Math.abs(moveY) * 0.001})`;
    });

    document.addEventListener('mouseleave', () => {
        if (profileImg) {
            profileImg.style.transform = '';
            profileImg.style.filter = '';
        }
    });
}

// Particle system
function initParticles() {
    const particles = document.querySelectorAll('.particle');

    particles.forEach((particle, index) => {
        // Случайные начальные позиции и задержки
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const delay = Math.random() * 5;

        particle.style.left = startX + '%';
        particle.style.top = startY + '%';
        particle.style.animationDelay = delay + 's';
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми анимируемыми элементами
    document.querySelectorAll('.skill-card, .gallery-card, .fade-in-up, .fade-in-left, .fade-in-right, .detail-card').forEach(el => {
        observer.observe(el);
    });
}

// Typewriter effect for quotes
function initTypewriter() {
    const quotes = document.querySelectorAll('.hero-quote');

    quotes.forEach(quote => {
        const originalText = quote.textContent;
        quote.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < originalText.length) {
                quote.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Запускаем печать с задержкой
        setTimeout(typeWriter, 2000);
    });
}

// Floating labels for form
function initFloatingLabels() {
    const inputs = document.querySelectorAll('.form-input');

    inputs.forEach(input => {
        // Проверяем, есть ли уже значение при загрузке
        if (input.value) {
            input.parentElement.classList.add('focused');
        }

        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Функция для инициализации кликов на все изображения
function initImageClicks() {
    const clickableImages = document.querySelectorAll('.clickable-image');
    let lastClickTime = 0;

    clickableImages.forEach(image => {
        image.addEventListener('click', function(e) {
            const currentTime = new Date().getTime();

            // Защита от спама кликов (минимум 2 секунды между кликами)
            if (currentTime - lastClickTime < 2000) {
                return;
            }

            lastClickTime = currentTime;

            // Анимация клика
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Воспроизводим фразу
            playRandomPhrase();
        });

        // Добавляем эффект при наведении
        image.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });

        image.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
}

// Equipment hover effects
function initEquipmentEffects() {
    const equipmentCards = document.querySelectorAll('.equipment-card, .detail-card');
    
    equipmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Family tree interactions
function initFamilyInteractions() {
    const treeNodes = document.querySelectorAll('.tree-node');
    
    treeNodes.forEach(node => {
        node.addEventListener('click', function() {
            treeNodes.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            
            const name = this.querySelector('span')?.textContent || 
                        this.querySelector('strong')?.textContent;
            
            if (name && name !== 'Клан Аккерманов') {
                showSubtitles(`Информация о ${name}`);
            }
        });
    });
}

// Animated skill bars - ИСПРАВЛЕННАЯ ВЕРСИЯ
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-progress');
                stats.forEach(stat => {
                    // Сохраняем исходную ширину
                    const finalWidth = stat.style.width;
                    // Устанавливаем начальную ширину 0%
                    stat.style.width = '0%';
                    // Анимируем до финального значения
                    setTimeout(() => {
                        stat.style.width = finalWidth;
                        // Добавляем класс завершения анимации
                        stat.classList.add('animated');
                    }, 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize all animations
function initAnimations() {
    initCursor();
    initEyeFollow();
    initParticles();
    initScrollAnimations();
    initTypewriter();
    initFloatingLabels();
    initImageClicks();
    initEquipmentEffects();
    initFamilyInteractions();
    initSkillBars();
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем текущий год в футере
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка успешной отправки формы Formspree
    const formMessage = document.getElementById('formMessage');

    if (formMessage) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            formMessage.style.display = 'block';
            formMessage.innerHTML = `
                <p>Спасибо! Ваше сообщение отправлено в штаб Разведкорпуса.</p>
                <p>Ожидайте ответа через сигнальные ракеты.</p>
            `;

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Добавляем активный класс к навигации при скролле
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLi = document.querySelectorAll('.nav-menu li');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('a');
            if (link && link.getAttribute('href') === '#' + current) {
                li.classList.add('active');
            }
        });
    });

    // Добавляем интерактивность для карточек
    document.querySelectorAll('.skill-card, .gallery-card, .detail-card, .member-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('visible')) {
                this.style.transform = 'translateY(20px) scale(1)';
            } else {
                this.style.transform = 'translateY(-5px) scale(1)';
            }
        });
    });

    // Анимация для герой-секции
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Инициализируем новые анимации
    setTimeout(() => {
        initEquipmentEffects();
        initFamilyInteractions();
        initSkillBars();
    }, 1000);
});

// Utility function for form subjects
function getSubjectText(value) {
    const subjects = {
        'report': 'Доклад о титанах',
        'join': 'Вступление в корпус',
        'info': 'Запрос информации',
        'equipment': 'Вопросы по снаряжению',
        'other': 'Другое'
    };
    return subjects[value] || 'Неизвестная тема';
}

// Utility function for equipment descriptions
function getEquipmentDescription(type) {
    const descriptions = {
        'ump': 'Вертикальное маневренное оборудование - основное оружие Разведкорпуса',
        'blades': 'Специальные клинки из ультравысокоуглеродистой стали',
        'uniform': 'Форма Разведкорпуса с эмблемой Свободных Крыльев',
        'gear': 'Дополнительное снаряжение для выживания и связи'
    };
    return descriptions[type] || 'Описание снаряжения';
}