// app/resume/page.tsx or pages/resume.tsx
export default function ResumeViewer() {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="/api/pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}
