import HomeClient from './HomeClient';

const Home = async ({ params }) => {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';
  
  return <HomeClient locale={locale} />;
};

export default Home; 