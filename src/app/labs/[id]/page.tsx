export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ]
}

export default function LabPage({ params }: { params: { id: string } }) {
  return (
    <div style={{padding: '2rem', color: 'white'}}>
      <h1>Lab {params.id}</h1>
      <p>Coming soon...</p>
      <a href="/final-aos/labs" style={{color: 'lightblue'}}>← Back to Labs</a>
    </div>
  )
}
