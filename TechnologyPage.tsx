import React from 'react';
import Card from './common/Card';

const TechCard: React.FC<{ icon: JSX.Element; name: string; description: string }> = ({ icon, name, description }) => (
  <Card className="flex flex-col items-center text-center">
    <div className="w-16 h-16 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-brand-dark">{name}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </Card>
);

const technologies = [
  { name: 'Python', icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" fill="#3776AB"/><path d="M15.5 8.75a.5.5 0 0 1-.5.5h-1.09a.5.5 0 0 0-.5.5v4.5a.5.5 0 0 0 .5.5h1.09a.5.5 0 0 1 .5.5v1.09a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1.09a.5.5 0 0 1 .5-.5h1.09a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 0-.5-.5H8a.5.5 0 0 1-.5-.5V9.25a.5.5 0 0 1 .5-.5h7Zm-5 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm3.5 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" fill="#FFD43B"/></svg>, description: "Backend logic" },
  { name: 'FastAPI', icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" fill="#05998b"/><path d="m16.2 12.8-1.7 1.7-1.7-1.7-1.7 1.7-1.7-1.7v-1.6l1.7-1.7 1.7 1.7 1.7-1.7 1.7 1.7v1.6Zm-3.4 0-1.7 1.7-1.7-1.7-1.7 1.7-1.7-1.7v-1.6l1.7-1.7 1.7 1.7 1.7-1.7 1.7 1.7v1.6l-1.7-1.7-1.7 1.7 1.7 1.7 1.7-1.7Zm0-3.4-1.7 1.7-1.7-1.7L7.7 11.2 6 9.5V7.8l1.7-1.7 1.7 1.7 1.7-1.7 1.7 1.7v1.7Z" stroke="#fff" strokeWidth="1.2"/></svg>, description: "Backend API" },
  { name: 'Streamlit', icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3 4.9c-.2-.4-.7-.4-.9 0L4.8 15.7c-.2.4.1.9.5.9h13.3c.5 0 .7-.5.5-.9l-6.8-10.8Z" fill="#FF4B4B"/></svg>, description: "Frontend UI" },
  { name: 'IBM Watson', icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-5 9.5a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2H7Zm8 2H9a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2Z" fill="#0062FF"/></svg>, description: "Medical NLP API" },
  { name: 'Hugging Face', icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.1 14.2c-.3 0-.6-.1-.9-.2-.3-.1-1.4-1-1.4-1s-1.1.9-1.4 1c-.3.1-.6.2-.9.2-.5 0-1-.2-1.3-.6-.3-.4-.4-.9-.3-1.4.1-.3.2-.6.4-.9.2-.3 1.1-1.3 1.1-1.3s-1-1.1-1.1-1.4c-.2-.3-.3-.6-.4-.9-.1-.5 0-1 .3-1.4.3-.4.8-.6 1.3-.6.3 0 .6.1.9.2.3.1 1.4 1 1.4 1s1.1-.9 1.4-1c.3-.1.6-.2.9-.2.5 0 1 .2 1.3.6.3.4.4.9.3 1.4-.1.3-.2.6-.4.9-.2.3-1.1 1.3-1.1 1.3s1 1.1 1.1 1.4c.2.3.3.6.4.9.1.5 0 1-.3 1.4-.3.4-.8.6-1.3.6Z" fill="#FFD21E"/></svg>, description: "BioBERT, ClinicalBERT" },
  { name: 'Database', icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.42 0-8 1.79-8 4v8c0 2.21 3.58 4 8 4s8-1.79 8-4V8c0-2.21-3.58-4-8-4Zm-6 4c0-.55.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1Zm12 4H6v-2h12v2Z" fill="#757575"/></svg>, description: "SQLite/PostgreSQL" },
  { name: 'Docker', icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.9 8.9c-.3-1.3-1.1-2.4-2.2-3.2l-1.2-.8c-.3-.2-.6-.3-.9-.3h-8.8c-.3 0-.6.1-.9.3l-1.2.8c-1.1.7-1.9 1.9-2.2 3.2l-.3 1.4v6.5l.3 1.4c.3 1.3 1.1 2.4 2.2 3.2l1.2.8c.3.2.6.3.9.3h8.8c.3 0 .6-.1.9-.3l1.2-.8c1.1-.7 1.9-1.9 2.2-3.2l.3-1.4V10.3l-.3-1.4ZM8.5 8h1.8v1.8H8.5V8Zm0 2.8h1.8v1.8H8.5v-1.8Zm0 2.7h1.8V15H8.5v-1.5Zm2.7-5.5h1.8v1.8h-1.8V8Zm0 2.8h1.8v1.8h-1.8v-1.8Zm0 2.7h1.8V15h-1.8v-1.5Zm2.7-5.5h1.8v1.8h-1.8V8Zm0 2.8h1.8v1.8h-1.8v-1.8Zm2.7-2.8h1.8v1.8h-1.8V8Z" fill="#2496ED"/></svg>, description: "Deployment" },
];

const TechnologyPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-brand-dark mb-10">Technology Stack</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {technologies.map((tech) => (
          <TechCard key={tech.name} icon={tech.icon} name={tech.name} description={tech.description} />
        ))}
      </div>
    </div>
  );
};

export default TechnologyPage;
