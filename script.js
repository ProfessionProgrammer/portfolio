/**
 * Krushna Kale - Senior Backend Engineer Portfolio JS
 * Interactive features, Theme Toggling, Live Terminal, Architecture Flowcharts, and Custom Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. DUAL-THEME CONTROLLER (LIGHT/DARK MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set default theme to dark if nothing is stored
    const activeTheme = savedTheme || 'dark';
    
    // Apply the active theme
    document.documentElement.setAttribute('data-theme', activeTheme);
    updateThemeIcon(activeTheme);
    
    // Click Listener
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Show subtle status feedback toast
        showToast(`Theme switched to ${newTheme === 'dark' ? 'Cyber Dark' : 'Elegant Light'}`, 'success');
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        }
    }

    /* ==========================================================================
       2. RESPONSIVE NAVIGATION DRAWER
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    
    mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
    });
    
    drawerClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
    });
    
    // Close drawer when clicking nav links or clicking outside the drawer
    document.querySelectorAll('.mobile-nav-drawer .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (mobileDrawer.classList.contains('open') && 
            !mobileDrawer.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileDrawer.classList.remove('open');
        }
    });

    /* ==========================================================================
       3. SMOOTH SCROLL WITH HEADER OFFSET
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       4. ACTIVE NAV LINK HIGHLIGHT & SCROLL EFFECTS
       ========================================================================== */
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollBar = document.getElementById('scroll-bar');
    const navbar = document.getElementById('navbar');
    
    // Intersection Observer for highlighting active section
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -60% 0px', // Adjusted to account for sticky navbar and viewport size
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
    
    // Window scroll events: Navbar scrolled state and Progress bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        
        if (scrollBar) {
            scrollBar.style.width = scrolled + "%";
        }
        
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    /* ==========================================================================
       5. LIVE BACKEND TERMINAL SIMULATOR
       ========================================================================== */
    const terminalBody = document.getElementById('terminal-body');
    const tabButtons = document.querySelectorAll('.terminal-tab-btn');
    
    // Preset mock log databases for each system
    const mockLogs = {
        netty: [
            { type: 'sys', text: 'Initializing high-performance TCP/IP network telemetry capture server...' },
            { type: 'sys', text: 'Binding Netty server bootstrap configuration context...' },
            { type: 'success', text: 'Netty telemetry listener successfully bound to port: 9081' },
            { type: 'info', text: 'Monitoring raw byte buffer pipeline (strategy: Lock-detection, Framing)' },
            { type: 'info', text: 'Awaiting connection handshake from legacy hardware instruments...' },
            { type: 'success', text: 'Established stable handshake from: Laboratory-Scale-4 (IP: 10.12.98.41)' },
            { type: 'info', text: 'Capturing byte stream... [02 4D 45 41 53 3A 20 32 34 2E 38 31 20 67 03]' },
            { type: 'success', text: 'Frame deserialized to UTF-8 value: "MEAS: 24.81 g" (Weight Sensor)' },
            { type: 'success', text: 'Published real-time telemetry payload downstream to WebSockets' },
            { type: 'info', text: 'Captured byte stream... [02 4D 45 41 53 3A 20 32 34 2E 38 32 20 67 03]' },
            { type: 'success', text: 'Frame deserialized to UTF-8 value: "MEAS: 24.82 g" (Weight Sensor)' },
            { type: 'info', text: 'Connection heartbeat diagnostics check... [OK - RTT: 2ms]' }
        ],
        excel: [
            { type: 'sys', text: 'Spawning cron poller task: Excel-Ingestion-Poller (Context: Quartz)' },
            { type: 'info', text: 'Scanning local network shares for incoming template uploads...' },
            { type: 'info', text: 'Scanning directory: "/mnt/lab-data/ard/analytical/" ...' },
            { type: 'success', text: 'Target found: "ARD-LOT-904-V5.xlsx" (Size: 1.82 MB)' },
            { type: 'info', text: 'Attempting file lease lock acquisition to prevent race conditions...' },
            { type: 'success', text: 'File lock confirmed. Initializing Apache POI dynamic stream parser...' },
            { type: 'sys', text: 'Detecting macro structures & spreadsheet column layout strategies...' },
            { type: 'success', text: 'Template pattern matches decoupled strategy ID: "ARD_TEMPLATE_V5"' },
            { type: 'info', text: 'Reading row records 1..50 (Strategy: Metadata Strategy Ingestion)...' },
            { type: 'success', text: 'Extracted 42 database-compliant rows. Mapping to Schema version: 5.1' },
            { type: 'info', text: 'Running transactional database pipeline validations...' },
            { type: 'success', text: 'Ingestion completed successfully. PostgreSQL transactions committed: 42' },
            { type: 'sys', text: 'Moving processed file to backup directory... [Archive: success]' }
        ],
        cds: [
            { type: 'sys', text: 'Launching event-driven bridge connector node (Waters Empower & Chromeleon)...' },
            { type: 'info', text: 'Establishing secure communication with .NET SDK proxy process...' },
            { type: 'success', text: 'Proxy handshake verified. IPC channel active.' },
            { type: 'info', text: 'Interrogating Empower CDS node: Empower-Server-02...' },
            { type: 'info', text: 'Executing thread-isolated query command via native SDK wrappers...' },
            { type: 'success', text: 'Raw injection data retrieved for Job ID: 8931221 [Status: Complete]' },
            { type: 'info', text: 'Translating vendor-specific schema representation to canonical XML schema...' },
            { type: 'sys', text: 'Initializing Kafka Producer instance...' },
            { type: 'success', text: 'Published standard event to Kafka topic: "scientific.injections.raw"' },
            { type: 'success', text: 'Message offset acknowledged by partition broker: Partition 2 - Offset: 491223' },
            { type: 'info', text: 'Heartbeat response received from Thermo Chromeleon bridge node [OK - online]' }
        ]
    };

    let activeTab = 'netty';
    let logIndex = 0;
    let logIntervalId = null;

    // Helper to get formatted local timestamp
    function getTimestamp() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        return `[${hrs}:${mins}:${secs}]`;
    }

    // Function to append a log line to the terminal
    function appendTerminalLine(logObj) {
        if (!terminalBody) return;
        
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        const stamp = document.createElement('span');
        stamp.className = 't-stamp';
        stamp.innerText = getTimestamp();
        
        const label = document.createElement('span');
        label.className = `t-${logObj.type}`;
        
        // Decide log type label
        let labelText = '[INFO]';
        if (logObj.type === 'sys') labelText = '[SYSTEM]';
        if (logObj.type === 'success') labelText = '[SUCCESS]';
        if (logObj.type === 'warn') labelText = '[WARN]';
        
        label.innerText = ` ${labelText} `;
        
        const text = document.createTextNode(logObj.text);
        
        line.appendChild(stamp);
        line.appendChild(label);
        line.appendChild(text);
        
        // Remove cursor before appending
        const cursor = terminalBody.querySelector('.t-cursor');
        if (cursor) cursor.remove();
        
        terminalBody.appendChild(line);
        
        // Append cursor back at the end
        const newCursor = document.createElement('span');
        newCursor.className = 't-cursor';
        terminalBody.appendChild(newCursor);
        
        // Auto Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
        
        // Keep logs capped at 40 lines
        const lines = terminalBody.querySelectorAll('.terminal-line');
        if (lines.length > 40) {
            lines[0].remove();
        }
    }

    // Load initial bulk set of logs for selected tab
    function initializeTerminal(tab) {
        if (!terminalBody) return;
        
        // Clear terminal
        terminalBody.innerHTML = '';
        activeTab = tab;
        logIndex = 0;
        
        // Load default set immediately
        const defaultLogs = mockLogs[tab];
        defaultLogs.slice(0, 6).forEach(log => {
            appendTerminalLine(log);
            logIndex++;
        });
        
        // Spawns continuous logs on dynamic intervals
        clearInterval(logIntervalId);
        startContinuousLogging();
    }

    function startContinuousLogging() {
        const run = () => {
            const pool = mockLogs[activeTab];
            
            // Get log object (cycle through logs if limit reached)
            const logObj = pool[logIndex % pool.length];
            
            // Randomize log message text slightly or append dynamic offsets/IDs
            let processedObj = { ...logObj };
            if (activeTab === 'netty' && logIndex > 10) {
                processedObj.text = `Captured telemetry value from Balance-4: ${(24.8 + Math.random() * 0.2).toFixed(2)} g`;
            } else if (activeTab === 'cds' && logIndex > 10) {
                processedObj.text = `Published injection event to Kafka partition: ${Math.floor(Math.random() * 4)} - offset: ${491223 + logIndex}`;
            }
            
            appendTerminalLine(processedObj);
            logIndex++;
            
            // Schedule next log on random timeout between 1.5s and 3.5s
            clearInterval(logIntervalId);
            const randomDelay = 1500 + Math.random() * 2000;
            logIntervalId = setTimeout(run, randomDelay);
        };
        
        logIntervalId = setTimeout(run, 2000);
    }

    // Bind tab clicks
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedTab = btn.getAttribute('data-tab');
            initializeTerminal(selectedTab);
        });
    });

    // Start terminal initially
    initializeTerminal('netty');


    /* ==========================================================================
       6. COLLAPSIBLE SYSTEM ARCHITECTURE FLOWCHARTS
       ========================================================================== */
    const toggleArchButtons = document.querySelectorAll('.btn-toggle-arch');
    
    toggleArchButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectNum = btn.getAttribute('data-project');
            const targetContainer = document.getElementById(`arch-p${projectNum}`);
            
            if (targetContainer) {
                const isActive = targetContainer.classList.contains('active');
                
                // Toggle active class
                if (isActive) {
                    targetContainer.classList.remove('active');
                    targetContainer.style.maxHeight = '0px';
                    btn.innerHTML = `<i class="fas fa-project-diagram"></i> Show Architecture Flow`;
                } else {
                    targetContainer.classList.add('active');
                    targetContainer.style.maxHeight = '400px';
                    btn.innerHTML = `<i class="fas fa-times-circle"></i> Hide Architecture Flow`;
                    
                    // Trigger dynamic pulse glow on flow lines inside diagram
                    const lines = targetContainer.querySelectorAll('.flowchart-line');
                    lines.forEach((line, index) => {
                        line.style.animationDelay = `${index * 0.5}s`;
                    });
                }
            }
        });
    });

    /* ==========================================================================
       7. CONTACT FORM SUBMISSION & CUSTOM TOAST SYSTEM
       ========================================================================== */
    const form = document.querySelector('.contact-form');
    const toastContainer = document.getElementById('toast-container');
    
    function showToast(message, type = 'success') {
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Add matching icon
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
        
        const text = document.createElement('span');
        text.innerText = message;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'toast-progress';
        
        toast.appendChild(icon);
        toast.appendChild(text);
        toast.appendChild(progressBar);
        
        toastContainer.appendChild(toast);
        
        // Toast Out timer
        setTimeout(() => {
            toast.style.animation = 'toast-out 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            setTimeout(() => {
                toast.remove();
            }, 350);
        }, 4000);
    }
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Perform basic aesthetic validation loader
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalHtml = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Ingesting request...`;
            
            setTimeout(() => {
                showToast('Connection request processed successfully! Krushna will get back to you shortly.', 'success');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHtml;
                form.reset();
            }, 1200);
        });
    }

    /* ==========================================================================
       8. FLOATING LABELS INPUT COMPATIBILITY
       ========================================================================== */
    // Ensure browser autofills don't break the floating label state
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value.trim() !== '') {
                input.setAttribute('value', input.value);
            } else {
                input.removeAttribute('value');
            }
        });
    });

    /* ==========================================================================
       9. INTERSECTION OBSERVER FOR FADE-IN SCROLL ANIMATIONS
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.section-fade');
    
    const fadeObserverOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it is cards, cascade them slightly
                const childCards = entry.target.querySelectorAll('.about-card, .project-card, .skill-category');
                if (childCards.length > 0) {
                    childCards.forEach((card, i) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(25px)';
                        card.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
                        
                        // Small microtask to force reflow
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);
    
    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });
});
