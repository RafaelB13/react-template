import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="bg-background flex h-screen flex-col items-center justify-center">
      <h1 className="text-foreground text-2xl font-bold">Welcome to the Home Page</h1>
      <p className="text-muted-foreground mt-4">This is the home page of your application.</p>
    </div>
  );
};
