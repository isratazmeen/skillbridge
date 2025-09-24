import './App.css';
import jsPDF from 'jspdf';
import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

function App() {
  const [skills, setSkills] = useState('');
  const [matches, setMatches] = useState([]);
const handleSubmit = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/match', { skills });
    console.log("Matched roles:", res.data.roles); // ✅ Inside try block
    setMatches(res.data.roles);
  } catch (err) {
    console.error('Error:', err);
  }
};
const exportPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("SkillBridge Match Report", 20, 20);

  matches.forEach((match, i) => {
    const y = 30 + i * 30;
    doc.setFontSize(14);
    doc.text(`${match.icon || '🔍'} ${match.role}`, 20, y);
    doc.setFontSize(12);
    doc.text(`Match: ${match.match}%`, 20, y + 8);
    doc.text(`Missing: ${match.missing?.join(', ') || 'None'}`, 20, y + 16);
  });

  doc.save('SkillBridge_Matches.pdf');
};

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>SkillBridge</h1>
      <textarea
        rows="5"
        cols="50"
        value={skills}
        onChange={e => setSkills(e.target.value)}
        placeholder="Enter your skills, separated by commas..."
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>Analyze</button>

      <h2>Matched Roles:</h2>
     <ul>
  {matches.map((match, idx) => (
    <li key={idx} style={{ marginBottom: '1rem' }}>
     <strong>{match.icon || '🔍'} {match.role}</strong><br />
      <em>{match.description}</em><br />
      <small style={{ color: 'gray' }}>
        Missing skills: {match.missing?.join(', ') || 'None'}
      </small>
    </li>
  ))}
</ul>
    {matches.length > 0 && (
  <>
    <h2>Skill Match Chart</h2>
    <Bar
      data={{
        labels: matches.map(m => m.role),
        datasets: [{
          label: 'Match %',
          data: matches.map(m => m.match),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      }}
      options={{
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }}
    />
    
    {/* ✅ PDF Export Button */}
    <button onClick={exportPDF} style={{ marginTop: '1rem' }}>
      📄 Download PDF Report
    </button>
  </>
)}
    </div>
  );
}

export default App;