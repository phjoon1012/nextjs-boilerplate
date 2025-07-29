'use client';

interface Skill {
  name: string;
  proficiency: 'expert' | 'advanced' | 'intermediate' | 'basic';
  category: string;
  icon?: string;
}

interface SkillMatrixProps {
  skills: Skill[];
  title?: string;
}

export default function SkillMatrix({ skills, title = "Technical Skills" }: SkillMatrixProps) {
  const getProficiencyColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-500 text-white';
      case 'advanced':
        return 'bg-blue-500 text-white';
      case 'intermediate':
        return 'bg-yellow-500 text-white';
      case 'basic':
        return 'bg-gray-300 text-gray-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getProficiencyLabel = (level: string) => {
    switch (level) {
      case 'expert':
        return 'Expert';
      case 'advanced':
        return 'Advanced';
      case 'intermediate':
        return 'Intermediate';
      case 'basic':
        return 'Basic';
      default:
        return 'Basic';
    }
  };

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">
          Skills organized by proficiency level and category
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Expert</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Advanced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Intermediate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span>Basic</span>
        </div>
      </div>

      {/* Skills by Category */}
      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category} className="bg-card border rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4 text-primary">{category}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills
                .filter(skill => skill.category === category)
                .map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {skill.icon && <span className="text-lg">{skill.icon}</span>}
                      <span className="font-medium text-sm">{skill.name}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}
                    >
                      {getProficiencyLabel(skill.proficiency)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 