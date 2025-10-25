// 鼠标跟随彩色星星动画
class StarTrail {
    constructor() {
        this.starsContainer = document.getElementById('stars-container');
        this.stars = [];
        this.maxStars = 50;
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        this.init();
    }

    init() {
        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            this.createStar(e.clientX, e.clientY);
        });

        // 定期清理星星
        setInterval(() => {
            this.cleanupStars();
        }, 100);
    }

    createStar(x, y) {
        // 限制星星数量
        if (this.stars.length >= this.maxStars) {
            return;
        }

        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机颜色
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        // 随机大小
        const size = Math.random() * 8 + 4;
        
        // 设置样式
        star.style.position = 'fixed';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.backgroundColor = color;
        star.style.borderRadius = '50%';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        star.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // 添加动画
        star.style.animation = 'starFade 1.5s ease-out forwards';
        
        // 添加到容器
        this.starsContainer.appendChild(star);
        this.stars.push(star);

        // 设置清理定时器
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
            const index = this.stars.indexOf(star);
            if (index > -1) {
                this.stars.splice(index, 1);
            }
        }, 1500);
    }

    cleanupStars() {
        // 清理超出屏幕的星星
        this.stars = this.stars.filter(star => {
            if (!star.parentNode) {
                return false;
            }
            const rect = star.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.left < window.innerWidth;
        });
    }
}

// 平滑滚动到顶部
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // 为所有内部链接添加平滑滚动
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 滚动动画
class ScrollAnimation {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        const animatedElements = document.querySelectorAll('.social-card, .education-item, .skill-category, .stat-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes starFade {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    new StarTrail();
    new SmoothScroll();
    new ScrollAnimation();
});

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', () => {
    // 社交媒体卡片现在通过CSS处理悬停效果，无需JavaScript

    // 教育经历项目悬停效果
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px) scale(1.01)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 技能分类悬停效果
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-3px) scale(1.01)';
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 统计项目悬停效果
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 项目模态框功能
const projectData = {
    'china-mobile': {
        title: 'China Mobile Analytics',
        subtitle: 'National Travel Pattern Analysis',
        description: 'Developed interactive dashboards using Python and Power BI to transform base station data into actionable insights about national travel patterns, directly informing regional marketing strategies.',
        technologies: ['Python', 'Power BI', 'SQL', 'Data Visualization'],
        impact: 'Helped shape targeted marketing strategies for data and voice plans during National Holiday periods.',
        duration: '3 months',
        role: 'Data Analyst'
    },
    'icbc-internship': {
        title: 'ICBC Data Analysis',
        subtitle: 'Product-Focused Analytics',
        description: 'Conducted comprehensive product-focused data analysis including writing SQL queries to extract user behavior data, designing and analyzing A/B tests to evaluate feature performance, and translating user insights into actionable product recommendations.',
        technologies: ['SQL', 'A/B Testing', 'Python', 'Product Analytics'],
        impact: 'Provided data-driven recommendations that influenced product development decisions.',
        duration: '3 months',
        role: 'Data Science Intern'
    },
    'news-recommendation': {
        title: 'News Recommendation System',
        subtitle: 'Intelligent Content System',
        description: 'Architected an intelligent news recommendation system leveraging large language models and the Flask framework, implementing machine learning models to deliver personalized content to users.',
        technologies: ['LLMs', 'Flask', 'Machine Learning', 'Python', 'NLP'],
        impact: 'Created a personalized content delivery system that improved user engagement.',
        duration: '2 months',
        role: 'ML Engineer'
    },
    'duke-projects': {
        title: 'Duke Research Projects',
        subtitle: 'Statistical Science Projects',
        description: 'Currently working on various statistical science research projects at Duke University, focusing on advanced statistical methods and their applications in real-world data analysis.',
        technologies: ['R', 'Statistics', 'Research', 'Statistical Modeling'],
        impact: 'Contributing to academic research in statistical science field.',
        duration: 'Ongoing',
        role: 'Graduate Research Assistant'
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const project = projectData[projectId];
    
    if (project) {
        modalContent.innerHTML = `
            <div class="project-modal-header">
                <h2 style="color: #0277bd; margin-bottom: 0.5rem;">${project.title}</h2>
                <p style="color: #4dd0e1; font-size: 1.1rem; margin-bottom: 1.5rem;">${project.subtitle}</p>
            </div>
            <div class="project-modal-body">
                <div class="project-detail">
                    <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Description</h4>
                    <p style="margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
                </div>
                <div class="project-detail">
                    <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Technologies Used</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                        ${project.technologies.map(tech => `<span style="background: #4dd0e1; color: white; padding: 0.3rem 0.8rem; border-radius: 12px; font-size: 0.9rem;">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-detail">
                    <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Impact</h4>
                    <p style="margin-bottom: 1.5rem; line-height: 1.6;">${project.impact}</p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem;">
                    <div>
                        <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Duration</h4>
                        <p style="color: #4dd0e1; font-weight: 500;">${project.duration}</p>
                    </div>
                    <div>
                        <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Role</h4>
                        <p style="color: #4dd0e1; font-weight: 500;">${project.role}</p>
                    </div>
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

