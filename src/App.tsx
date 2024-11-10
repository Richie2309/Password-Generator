import React from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import Header from './components/header';


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto">
        <PasswordGenerator />
      </main>
    </div>
  );
};

export default App;