export const LINKS = {
  email:    'nagakumaraswamy.g23@iiits.in',
  github:   'https://github.com/kumarswamyg2005',
  linkedin: 'https://www.linkedin.com/in/naga-kumaraswamy-gurram-a374833b0/',
  resume:   '/resume.pdf',
}

export default function Footer() {
  return (
    <footer className="wrap">
      <div className="footer">
        <span>Built with React and Vite · {new Date().getFullYear()}</span>
        <div className="footer-links">
          <a href={`mailto:${LINKS.email}`}>Email</a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={LINKS.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
        </div>
      </div>
    </footer>
  )
}
