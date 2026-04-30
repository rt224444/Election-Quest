// Election Learning Game - Enhanced Logic

// Data for Election Processes (Chunky Context)
const electionData = {
    indian: [
        { 
            title: "Voter Registration", 
            icon: "📝",
            summary: "Citizens aged 18+ register for their Voter ID card (EPIC).",
            details: [
                "Eligibility check: Must be an Indian citizen and resident of the constituency.",
                "Form 6 submission: Filed online through NVSP or offline at Booth Level Officer.",
                "Verification: BLO visits the residence to verify details.",
                "EPIC Generation: The unique Voter ID is issued and delivered."
            ]
        },
        { 
            title: "Nominations", 
            icon: "📋",
            summary: "Candidates file nomination papers and declare assets.",
            details: [
                "Security Deposit: Candidates must pay a deposit (refunded if they get 1/6th votes).",
                "Affidavit (Form 26): Mandatory disclosure of criminal record, assets, and education.",
                "Proposers: Independent candidates need 10 proposers from the constituency.",
                "Scrutiny: Election Commission checks for any disqualifications."
            ]
        },
        { 
            title: "Campaigning", 
            icon: "📢",
            summary: "Parties release manifestos and hold rallies to share their vision.",
            details: [
                "Model Code of Conduct: Strict rules for parties (no state resource misuse).",
                "Public Meetings: Rallies, roadshows, and door-to-door visits.",
                "Digital Campaign: Social media and mass messaging campaigns.",
                "Silence Period: Campaigning must stop 48 hours before voting ends."
            ]
        },
        { 
            title: "Voting Day", 
            icon: "🗳️",
            summary: "Citizens cast votes using Electronic Voting Machines (EVMs).",
            details: [
                "Polling Station: Usually located in schools or community centers.",
                "Inking: Indelible ink is applied to the left index finger.",
                "EVM & VVPAT: Electronic voting with a paper slip verification.",
                "Security: Central Armed Police Forces ensure peaceful voting."
            ]
        },
        { 
            title: "Counting & Results", 
            icon: "📊",
            summary: "Votes are counted, and the candidate with the most votes wins.",
            details: [
                "Counting Centers: High-security zones where EVMs are stored.",
                "Round-wise Counting: Votes are tallied round by round under supervision.",
                "Winning: 'First Past The Post' system (highest votes wins, even if < 50%).",
                "Victory: Return of Election Certificate is issued to the winner."
            ]
        }
    ],
    education: [
        { 
            title: "Nomination", 
            icon: "🎓",
            summary: "Students file names for Class Representative or Council posts.",
            details: [
                "Selection Criteria: Attendance record and academic standing (often required).",
                "Teacher Approval: The Class Teacher or House Master vets candidates.",
                "Self-Nomination: Students step forward to represent their peers.",
                "Peer Support: Sometimes needs a 'second' (another student to vouch)."
            ]
        },
        { 
            title: "The Manifesto", 
            icon: "💡",
            summary: "Candidates promise better events, facilities, or representation.",
            details: [
                "Creative Slogans: Catchy phrases to stick in students' minds.",
                "Action Items: Promises for more sports gear, better canteen, or cleaner rooms.",
                "Feasibility: Teachers check if promises are realistic within school rules.",
                "Poster Design: Hand-drawn or printed posters for the classroom walls."
            ]
        },
        { 
            title: "Campaign Speeches", 
            icon: "🎤",
            summary: "Candidates address the class/assembly to win trust.",
            details: [
                "Public Speaking: A 2-minute speech in front of the class or morning assembly.",
                "Q&A Session: Classmates ask questions about the manifesto.",
                "Body Language: Learning to look confident and maintain eye contact.",
                "Tone: Balancing friendliness with leadership authority."
            ]
        },
        { 
            title: "The Ballot", 
            icon: "🗳️",
            summary: "Students cast secret paper ballots or digital votes.",
            details: [
                "Secret Ballot: Votes are written on paper and folded to hide the choice.",
                "The Ballot Box: A sealed box placed at the teacher's desk.",
                "One Vote Rule: Every student in the class has exactly one vote.",
                "Teacher Supervision: Ensuring no 'vote-trading' or bullying happens."
            ]
        },
        { 
            title: "Announcement", 
            icon: "🏆",
            summary: "Teacher/Principal announces the results in assembly.",
            details: [
                "Counting: A small committee of students (neutral) counts the slips.",
                "Victory Speech: The winner thanks the class for their trust.",
                "Responsibility: Badges or sashes are handed over (Investiture).",
                "Feedback: Unsuccessful candidates learn about democratic participation."
            ]
        }
    ]
};

// Three.js Scene Setup
let scene, camera, renderer, ballotBox;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(ambientLight, pointLight);

    // Ballot Box
    const geometry = new THREE.BoxGeometry(10, 12, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0x6366f1 });
    ballotBox = new THREE.Mesh(geometry, material);
    
    const slotGeo = new THREE.BoxGeometry(6, 0.5, 1);
    const slotMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const slot = new THREE.Mesh(slotGeo, slotMat);
    slot.position.y = 6;
    ballotBox.add(slot);

    scene.add(ballotBox);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    ballotBox.rotation.y += 0.005;
    ballotBox.position.y = Math.sin(Date.now() * 0.001) * 2;
    renderer.render(scene, camera);
}

// GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.from(".reveal-text", { y: 100, opacity: 0, duration: 1.5, ease: "power4.out" });
    gsap.from(".subtitle", { y: 50, opacity: 0, duration: 1.2, delay: 0.5, ease: "power3.out" });

    gsap.from(".card", {
        scrollTrigger: { trigger: ".categories", start: "top 80%" },
        y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: "back.out(1.7)"
    });
}

// Voting Animation Logic
function playVotingAnimation(type, callback) {
    // Create a 'vote paper' element
    const paper = document.createElement('div');
    paper.className = 'vote-paper';
    paper.innerHTML = type === 'indian' ? '🇮🇳 VOTE' : '🎓 VOTE';
    document.body.appendChild(paper);

    // Position paper near the clicked card
    const card = document.getElementById(`card-${type}`);
    const rect = card.getBoundingClientRect();
    
    gsap.set(paper, {
        x: rect.left + rect.width / 2 - 50,
        y: rect.top + rect.height / 2 - 30,
        opacity: 1,
        scale: 1,
        rotation: 0
    });

    const tl = gsap.timeline({
        onComplete: () => {
            paper.remove();
            if (callback) callback();
        }
    });

    // 1. Fold Animation (Scale down and rotate)
    tl.to(paper, {
        scaleX: 0.3,
        duration: 0.5,
        ease: "power2.inOut"
    });
    tl.to(paper, {
        scaleY: 0.2,
        duration: 0.4,
        ease: "power2.inOut"
    }, "-=0.2");

    // 2. Move to 3D Box (Center of screen)
    tl.to(paper, {
        x: window.innerWidth / 2 - 25,
        y: window.innerHeight / 2 - 20,
        rotation: 720,
        duration: 1,
        ease: "back.in(1.7)"
    });

    // 3. Drop into Box
    tl.to(paper, {
        y: "+=100",
        opacity: 0,
        scale: 0.1,
        duration: 0.5
    });

    // Animate the 3D box slightly when 'receiving' the vote
    gsap.to(ballotBox.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
}

// Path Selection Logic
function selectPath(type) {
    playVotingAnimation(type, () => {
        renderSteps(type);
    });
}

function renderSteps(type) {
    const container = document.getElementById('steps-container');
    container.innerHTML = '';

    const data = electionData[type];
    const sectionTitle = type === 'indian' ? 'Indian National Election' : 'Education System Election';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'section-title gradient-text';
    titleHeader.innerText = sectionTitle;
    container.appendChild(titleHeader);

    data.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'step-item';
        
        const detailsHtml = step.details.map(d => `<li>${d}</li>`).join('');

        stepEl.innerHTML = `
            <div class="step-card expandable">
                <div class="step-number">0${index + 1}</div>
                <div class="step-main">
                    <div class="step-header">
                        <span class="step-icon">${step.icon}</span>
                        <h3>${step.title}</h3>
                    </div>
                    <p class="step-summary">${step.summary}</p>
                    <div class="step-details-wrapper">
                        <ul class="step-details-list">
                            ${detailsHtml}
                        </ul>
                    </div>
                    <button class="expand-btn">Learn More ↓</button>
                </div>
            </div>
        `;
        container.appendChild(stepEl);

        // Expand logic
        const btn = stepEl.querySelector('.expand-btn');
        const details = stepEl.querySelector('.step-details-wrapper');
        
        btn.addEventListener('click', () => {
            const isOpen = details.classList.contains('open');
            if (isOpen) {
                gsap.to(details, { height: 0, opacity: 0, duration: 0.5, ease: "power2.inOut" });
                btn.innerText = 'Learn More ↓';
                details.classList.remove('open');
            } else {
                gsap.set(details, { height: "auto" });
                const height = details.offsetHeight;
                gsap.fromTo(details, { height: 0, opacity: 0 }, { height: height, opacity: 1, duration: 0.5, ease: "power2.out" });
                btn.innerText = 'Show Less ↑';
                details.classList.add('open');
            }
        });

        gsap.to(stepEl, {
            scrollTrigger: { trigger: stepEl, start: "top 85%" },
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out"
        });
    });

    gsap.to(window, { duration: 1, scrollTo: "#process", ease: "power2.inOut" });
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    initThree();
    initAnimations();

    const progress = document.querySelector('.progress');
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 30;
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            gsap.to("#loader", {
                opacity: 0, duration: 1,
                onComplete: () => document.getElementById('loader').style.display = 'none'
            });
        }
        progress.style.width = width + '%';
    }, 200);

    document.getElementById('card-indian').addEventListener('click', () => selectPath('indian'));
    document.getElementById('card-education').addEventListener('click', () => selectPath('education'));
});
