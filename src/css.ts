const css = /*css*/`
  :root {
    --yellow: #ffc600;
  }

    body#viewer_v2 {
    background: white url('https://wesbos.com/static/blackgrit-6a2d636a530802d3ce97afb7af53a84b.png');
    background-size: 300px;
  }

  .cloudapp-btn.blue {
    background: var(--yellow);
    border: 0;
  }

  .viewer_v2 .navbar {
    grid-template-columns: 10fr 1fr;
    height: auto;
    position: relative;
  }

  .logo-section {
    grid-column: 1 / -1;
    text-align: center;
  }

`

export const customCSS = `<style class="wes-custom-ass-css">${css}</style>`
