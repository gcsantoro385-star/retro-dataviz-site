/**
 * RETRO TERMINAL INTERACTIVITY & CRT CONTROLS
 * Applied Data Visualization Course Web Platform
 */

(function() {
  'use strict';

  // --- AUDIO SYNTHESIZER (Web Audio API Retro Blips) ---
  let audioCtx = null;
  let soundEnabled = localStorage.getItem('retro_sound') === 'true';

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playTone(frequency, type = 'sine', duration = 0.05, volume = 0.05) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio failure
    }
  }

  function playKeyClick() {
    playTone(1200 + Math.random() * 200, 'triangle', 0.03, 0.03);
  }

  function playChime() {
    if (!soundEnabled) return;
    playTone(587.33, 'sine', 0.1, 0.06); // D5
    setTimeout(() => playTone(880.00, 'sine', 0.15, 0.06), 80); // A5
  }

  // --- CRT SCANLINES & GLOW TOGGLES ---
  function initDisplayPreferences() {
    const scanlinesOff = localStorage.getItem('retro_scanlines_off') === 'true';
    if (scanlinesOff) {
      document.body.classList.add('scanlines-off');
    }

    const highContrast = localStorage.getItem('retro_high_contrast') === 'true';
    if (highContrast) {
      document.body.classList.add('mode-high-contrast');
    }

    updateControlsUI();
  }

  function toggleScanlines() {
    playKeyClick();
    const isOff = document.body.classList.toggle('scanlines-off');
    localStorage.setItem('retro_scanlines_off', isOff);
    updateControlsUI();
  }

  function toggleContrast() {
    playKeyClick();
    const isHigh = document.body.classList.toggle('mode-high-contrast');
    localStorage.setItem('retro_high_contrast', isHigh);
    updateControlsUI();
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('retro_sound', soundEnabled);
    if (soundEnabled) {
      initAudio();
      playChime();
    }
    updateControlsUI();
  }

  function updateControlsUI() {
    const btnScan = document.getElementById('btn-toggle-scanlines');
    if (btnScan) {
      const isOff = document.body.classList.contains('scanlines-off');
      btnScan.textContent = `[SCANLINES: ${isOff ? 'OFF' : 'ON'}]`;
    }

    const btnGlow = document.getElementById('btn-toggle-glow');
    if (btnGlow) {
      const isHigh = document.body.classList.contains('mode-high-contrast');
      btnGlow.textContent = `[GLOW: ${isHigh ? 'OFF' : 'ON'}]`;
    }

    const btnAudio = document.getElementById('btn-toggle-audio');
    if (btnAudio) {
      btnAudio.textContent = `[AUDIO: ${soundEnabled ? 'ON' : 'OFF'}]`;
      if (soundEnabled) {
        btnAudio.classList.add('amber');
      } else {
        btnAudio.classList.remove('amber');
      }
    }
  }

  // --- SYSTEM CLOCK & UPTIME ---
  let startTime = Date.now();

  function updateClock() {
    const clockEl = document.getElementById('terminal-clock');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toTimeString().split(' ')[0] + ' LOC';
    }

    const uptimeEl = document.getElementById('terminal-uptime');
    if (uptimeEl) {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
      const secs = String(elapsedSec % 60).padStart(2, '0');
      uptimeEl.textContent = `UP ${mins}:${secs}`;
    }
  }

  // --- QUICK COMMAND / JUMP MODAL ---
  const assignmentsData = [
    { num: 1, file: 'assignment-01.html', title: 'Dataset Selection & Problem Formulation', tag: 'Scope' },
    { num: 2, file: 'assignment-02.html', title: 'Data Acquisition & Schema Profiling', tag: 'Ingest' },
    { num: 3, file: 'assignment-03.html', title: 'Exploratory Data Analysis & Statistics', tag: 'EDA' },
    { num: 4, file: 'assignment-04.html', title: 'Data Cleaning & Transformation Pipeline', tag: 'ETL' },
    { num: 5, file: 'assignment-05.html', title: 'Univariate Distributions & Outlier Checks', tag: 'Distr' },
    { num: 6, file: 'assignment-06.html', title: 'Bivariate Relationships & Correlations', tag: 'Corr' },
    { num: 7, file: 'assignment-07.html', title: 'Multivariate Visualizations & Dimensionality', tag: 'Multi' },
    { num: 8, file: 'assignment-08.html', title: 'Time-Series & Temporal Analysis', tag: 'Time' },
    { num: 9, file: 'assignment-09.html', title: 'Geospatial & Hierarchical Visualizations', tag: 'Geo' },
    { num: 10, file: 'assignment-10.html', title: 'Interactive Visualizations & Dynamic Filters', tag: 'UI' },
    { num: 11, file: 'assignment-11.html', title: 'Data Storytelling & Dashboard Synthesis', tag: 'Story' },
    { num: 12, file: 'assignment-12.html', title: 'Final Capstone Report & Findings', tag: 'Report' }
  ];

  function getRootPath() {
    // Check if we are inside /assignments/ folder
    return window.location.pathname.includes('/assignments/') ? '../' : './';
  }

  function openCommandPalette() {
    playChime();
    let modal = document.getElementById('cmd-palette-modal');
    if (!modal) {
      modal = createCommandModal();
    }
    modal.classList.add('open');
    const input = document.getElementById('cmd-palette-input');
    if (input) {
      input.value = '';
      input.focus();
      filterAssignments('');
    }
  }

  function closeCommandPalette() {
    playKeyClick();
    const modal = document.getElementById('cmd-palette-modal');
    if (modal) {
      modal.classList.remove('open');
    }
  }

  function filterAssignments(query) {
    const list = document.getElementById('cmd-palette-results');
    if (!list) return;
    list.innerHTML = '';
    const root = getRootPath();
    const q = query.toLowerCase().trim();

    // Add Home option
    if (!q || 'home'.includes(q) || 'cover'.includes(q) || 'index'.includes(q)) {
      const li = document.createElement('li');
      li.className = 'command-item';
      li.innerHTML = `<span>[00] Home / Cover Page</span> <span class="tag">INDEX</span>`;
      li.onclick = () => { window.location.href = root + 'index.html'; };
      list.appendChild(li);
    }

    const filtered = assignmentsData.filter(a => {
      if (!q) return true;
      const numStr = String(a.num);
      return numStr === q ||
             ('a' + numStr).includes(q) ||
             ('assignment ' + numStr).toLowerCase().includes(q) ||
             a.title.toLowerCase().includes(q) ||
             a.tag.toLowerCase().includes(q);
    });

    filtered.forEach(a => {
      const li = document.createElement('li');
      li.className = 'command-item';
      const padNum = String(a.num).padStart(2, '0');
      li.innerHTML = `<span>[A${padNum}] ${a.title}</span> <span class="tag">${a.tag}</span>`;
      li.onclick = () => {
        window.location.href = (root === './' ? 'assignments/' : '') + a.file;
      };
      list.appendChild(li);
    });

    if (filtered.length === 0 && (!q || !('home'.includes(q)))) {
      const li = document.createElement('li');
      li.className = 'command-item';
      li.style.color = 'var(--accent-amber)';
      li.textContent = 'NO COMMAND OR ASSIGNMENT MATCHED QUERY';
      list.appendChild(li);
    }
  }

  function createCommandModal() {
    const backdrop = document.createElement('div');
    backdrop.id = 'cmd-palette-modal';
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="command-modal" onclick="event.stopPropagation()">
        <div class="command-input-line">
          <span class="prompt-symbol">&gt;</span>
          <input type="text" id="cmd-palette-input" class="command-input" placeholder="Type 1-12, 'home', or keyword..." autocomplete="off" />
          <button type="button" class="term-btn" id="btn-close-cmd">[ESC]</button>
        </div>
        <ul id="cmd-palette-results" class="command-results"></ul>
        <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between;">
          <span>Navigation Quick-Jump</span>
          <span>Press ESC or Click Outside to Exit</span>
        </div>
      </div>
    `;

    backdrop.onclick = closeCommandPalette;
    document.body.appendChild(backdrop);

    const input = backdrop.querySelector('#cmd-palette-input');
    input.addEventListener('input', (e) => {
      playKeyClick();
      filterAssignments(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCommandPalette();
      if (e.key === 'Enter') {
        const first = backdrop.querySelector('.command-item');
        if (first) first.click();
      }
    });

    backdrop.querySelector('#btn-close-cmd').onclick = closeCommandPalette;
    return backdrop;
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initDisplayPreferences();
    setInterval(updateClock, 1000);
    updateClock();

    // Attach click tone to all buttons and links
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a, select, input');
      if (target && !target.id?.includes('toggle-audio')) {
        playKeyClick();
      }
    });

    // Control buttons
    const btnScan = document.getElementById('btn-toggle-scanlines');
    if (btnScan) btnScan.addEventListener('click', toggleScanlines);

    const btnGlow = document.getElementById('btn-toggle-glow');
    if (btnGlow) btnGlow.addEventListener('click', toggleContrast);

    const btnAudio = document.getElementById('btn-toggle-audio');
    if (btnAudio) btnAudio.addEventListener('click', toggleSound);

    const btnCmd = document.getElementById('btn-open-cmd');
    if (btnCmd) btnCmd.addEventListener('click', openCommandPalette);

    // Global keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
      } else if (e.key === 'Escape') {
        closeCommandPalette();
      }
    });
  });

  // Expose useful utilities globally
  window.RetroTerminal = {
    playTone,
    playKeyClick,
    playChime,
    openCommandPalette,
    closeCommandPalette
  };

})();
