const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const roles = {
  "Amazon SDE Intern": {
    icon: "🧠",
    skills: ["C++", "DSA", "System Design"],
    description: "Software development internship focused on scalable systems, algorithms, and cloud services."
  },
  "Lumel Product Dev": {
    icon: "🎨",
    skills: ["JavaScript", "React", "Storytelling"],
    description: "Creative product development with a focus on frontend engineering and user experience."
  },
  "Frontend Engineer": {
    icon: "💻",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    description: "UI-focused engineering role building responsive, accessible web interfaces."
  }
};

app.post('/api/match', (req, res) => {
  const userSkills = req.body.skills
    .split(',')
    .map(s => s.trim().toLowerCase());

  const matchedRoles = [];

  for (let [role, data] of Object.entries(roles)) {
    const normalizedRoleSkills = data.skills.map(s => s.toLowerCase());
    const matchCount = normalizedRoleSkills.filter(skill =>
      userSkills.includes(skill)
    ).length;

    const matchPercentage = Math.round((matchCount / data.skills.length) * 100);
    const missing = normalizedRoleSkills.filter(skill => !userSkills.includes(skill));

    if (matchCount >= 1) {
      matchedRoles.push({
        role,
        description: data.description,
        match: matchPercentage,
        missing,
        icon: data.icon // ✅ This sends the emoji
      });
    }
  }

  res.json({ roles: matchedRoles });
});

app.listen(5000, () => {
  console.log('✅ Backend running on http://localhost:5000');
});