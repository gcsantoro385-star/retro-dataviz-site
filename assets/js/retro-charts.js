/**
 * RETRO CHART.JS THEME & VISUALIZATION PRESETS
 * Applied Data Visualization Course Web Platform
 */

(function() {
  'use strict';

  const RetroColors = {
    greenPrimary: '#20e070',
    greenBright: '#42ff92',
    greenMuted: '#128243',
    greenDim: '#0a4f28',
    gridGreen: 'rgba(25, 106, 54, 0.4)',
    amber: '#ffb000',
    amberFill: 'rgba(255, 176, 0, 0.2)',
    cyan: '#00e5ff',
    cyanFill: 'rgba(0, 229, 255, 0.2)',
    bgDark: '#040805',
    bgSurface: '#08120a'
  };

  // Setup default Chart.js configuration if Chart is loaded
  function applyRetroChartDefaults() {
    if (typeof Chart === 'undefined') return;

    Chart.defaults.color = RetroColors.greenMuted;
    Chart.defaults.font.family = "'Share Tech Mono', 'Consolas', monospace";
    Chart.defaults.font.size = 12;

    // Plugins default configuration
    Chart.defaults.plugins.tooltip.backgroundColor = '#050c07';
    Chart.defaults.plugins.tooltip.titleColor = RetroColors.greenBright;
    Chart.defaults.plugins.tooltip.bodyColor = RetroColors.greenPrimary;
    Chart.defaults.plugins.tooltip.borderColor = RetroColors.greenPrimary;
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.boxPadding = 6;
    Chart.defaults.plugins.tooltip.cornerRadius = 0;
    Chart.defaults.plugins.tooltip.displayColors = false;

    // Legend styling
    Chart.defaults.plugins.legend.labels.color = RetroColors.greenBright;
    Chart.defaults.plugins.legend.labels.boxWidth = 12;
  }

  // Create Standard Glowing Retro Line Chart
  function createRetroLineChart(canvasId, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return null;

    applyRetroChartDefaults();

    const labels = options.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = options.data || [65, 59, 80, 81, 56, 55, 70, 75, 82, 90, 85, 94];
    const label = options.label || 'Observed Trend Metrics';

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          borderColor: RetroColors.greenBright,
          borderWidth: 2,
          backgroundColor: 'rgba(32, 224, 112, 0.12)',
          fill: true,
          tension: 0.2,
          pointBackgroundColor: RetroColors.greenBright,
          pointBorderColor: RetroColors.bgDark,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: RetroColors.gridGreen, drawBorder: true },
            ticks: { color: RetroColors.greenMuted }
          },
          y: {
            grid: { color: RetroColors.gridGreen, drawBorder: true },
            ticks: { color: RetroColors.greenMuted }
          }
        }
      }
    });
  }

  // Create Standard Glowing Retro Bar Chart
  function createRetroBarChart(canvasId, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return null;

    applyRetroChartDefaults();

    const labels = options.labels || ['Cat A', 'Cat B', 'Cat C', 'Cat D', 'Cat E', 'Cat F'];
    const data = options.data || [45, 78, 52, 91, 63, 84];
    const label = options.label || 'Distribution Values';

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: 'rgba(32, 224, 112, 0.35)',
          borderColor: RetroColors.greenBright,
          borderWidth: 1.5,
          hoverBackgroundColor: 'rgba(66, 255, 146, 0.65)',
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: RetroColors.gridGreen },
            ticks: { color: RetroColors.greenMuted }
          },
          y: {
            grid: { color: RetroColors.gridGreen },
            ticks: { color: RetroColors.greenMuted }
          }
        }
      }
    });
  }

  // Expose on window
  window.RetroCharts = {
    colors: RetroColors,
    createRetroLineChart,
    createRetroBarChart
  };

  document.addEventListener('DOMContentLoaded', applyRetroChartDefaults);
})();
