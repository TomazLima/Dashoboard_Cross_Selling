import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBank, setSelectedBank] = useState(null);

  // Dados atualizados
  const marketShareData = {
    'Conta-Corrente': [
      { name: 'Itaú', value: 30, color: '#EC7000' },
      { name: 'Nubank', value: 25, color: '#8A05BE' },
      { name: 'Inter', value: 20, color: '#FF500F' },
      { name: 'C6 Bank', value: 15, color: '#000000' },
      { name: 'Outros', value: 10, color: '#757575' },
    ],
    'Cartão de Crédito': [
      { name: 'Itaú', value: 28, color: '#EC7000' },
      { name: 'Nubank', value: 30, color: '#8A05BE' },
      { name: 'Inter', value: 18, color: '#FF500F' },
      { name: 'C6 Bank', value: 14, color: '#000000' },
      { name: 'Outros', value: 10, color: '#757575' },
    ],
  };

  const competitorData = [
    { name: 'Itaú', overallScore: 85, ccScore: 87, creditScore: 83, color: '#EC7000' },
    { name: 'Nubank', overallScore: 88, ccScore: 86, creditScore: 90, color: '#8A05BE' },
    { name: 'Inter', overallScore: 82, ccScore: 84, creditScore: 80, color: '#FF500F' },
    { name: 'C6 Bank', overallScore: 80, ccScore: 81, creditScore: 79, color: '#000000' },
  ];

  const productDetailsMatrix = [
    { parameter: 'Taxas e tarifas', 'Itaú': 8, 'Nubank': 9, 'Inter': 8, 'C6 Bank': 7 },
    { parameter: 'Benefícios e recompensas', 'Itaú': 7, 'Nubank': 8, 'Inter': 7, 'C6 Bank': 6 },
    { parameter: 'Experiência do usuário', 'Itaú': 9, 'Nubank': 9, 'Inter': 8, 'C6 Bank': 8 },
    { parameter: 'Estratégias de marketing', 'Itaú': 8, 'Nubank': 9, 'Inter': 7, 'C6 Bank': 7 },
    { parameter: 'Inovação tecnológica', 'Itaú': 8, 'Nubank': 9, 'Inter': 8, 'C6 Bank': 8 },
    { parameter: 'Presença física', 'Itaú': 9, 'Nubank': 5, 'Inter': 6, 'C6 Bank': 5 },
    { parameter: 'Segurança e privacidade', 'Itaú': 9, 'Nubank': 8, 'Inter': 8, 'C6 Bank': 8 },
  ];

  const newsData = {
    'Itaú': [
      { id: 1, text: 'Itaú lança novo programa de fidelidade' },
      { id: 2, text: 'Atualização do app Itaú traz melhorias na segurança' },
    ],
    'Nubank': [
      { id: 1, text: 'Nubank lança nova funcionalidade de investimentos no app' },
      { id: 2, text: 'Nubank expande serviços para pequenas empresas' },
    ],
    'Inter': [
      { id: 1, text: 'Inter anuncia parceria com grande varejista para cashback' },
      { id: 2, text: 'Inter lança cartão premium com benefícios exclusivos' },
    ],
    'C6 Bank': [
      { id: 1, text: 'C6 Bank reduz taxas de transferência internacional' },
      { id: 2, text: 'C6 Bank implementa nova tecnologia de reconhecimento facial' },
    ],
  };

  const socialMediaData = {
    'Itaú': { Positivo: 65, Neutro: 25, Negativo: 10 },
    'Nubank': { Positivo: 70, Neutro: 20, Negativo: 10 },
    'Inter': { Positivo: 62, Neutro: 28, Negativo: 10 },
    'C6 Bank': { Positivo: 60, Neutro: 30, Negativo: 10 },
  };

  const socialMediaComments = {
    Positivo: '@usuario1: Excelente programa de Recompensas, fonte: Twitter, classificação: Positivo',
    Neutro: '@usuario2: O app está ok, mas poderia melhorar, fonte: Instagram, classificação: Neutro',
    Negativo: '@usuario3: Demorei muito para ser atendido no suporte, fonte: Facebook, classificação: Negativo',
  };

  const renderMarketShareCharts = () => (
    <div className="flex justify-between mb-8">
      {Object.entries(marketShareData).map(([product, data]) => (
        <div key={product} className="w-1/2 pr-4">
          <h3 className="text-lg font-semibold mb-2">{product}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );

  const renderCompetitorCards = () => (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {competitorData.map((competitor) => (
        <div 
          key={competitor.name} 
          className="bg-white p-4 rounded shadow cursor-pointer"
          onClick={() => setSelectedBank(competitor.name)}
        >
          <h3 className="font-bold">{competitor.name}</h3>
          <p>Score Geral: {competitor.overallScore}/100</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded">
              <div 
                className="text-xs font-medium text-white text-center p-0.5 leading-none rounded" 
                style={{ width: `${competitor.overallScore}%`, backgroundColor: competitor.color }}
              >
                {competitor.overallScore}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProductDetailsTab = () => (
    <div>
      <h2 className="text-xl font-bold mb-2">Detalhes dos Produtos</h2>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left">Parâmetro</th>
            {competitorData.map(competitor => (
              <th key={competitor.name} className="text-left">{competitor.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productDetailsMatrix.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td>{row.parameter}</td>
              {competitorData.map(competitor => (
                <td key={competitor.name}>{row[competitor.name]}/10</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderBankDetails = () => {
    if (!selectedBank) return null;
    const bank = competitorData.find(b => b.name === selectedBank);
    
    const scoreData = [
      { name: 'Geral', score: bank.overallScore },
      { name: 'Conta-Corrente', score: bank.ccScore },
      { name: 'Cartão de Crédito', score: bank.creditScore },
    ];

    return (
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">{bank.name}</h2>
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-bold mb-2">Scores por Produto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill={bank.color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-bold mb-2">Notícias Recentes</h3>
          <ul>
            {newsData[bank.name].map((news) => (
              <li key={news.id} className="mb-2">{news.text}</li>
            ))}
          </ul>
        </div>

        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setSelectedBank(null)}
        >
          Voltar
        </button>
      </div>
    );
  };

  const renderSocialMediaTab = () => (
    <div>
      <h2 className="text-xl font-bold mb-2">Análise de Redes Sociais</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={Object.entries(socialMediaData).map(([bank, data]) => ({ name: bank, ...data }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Positivo" fill="#4CAF50" />
          <Bar dataKey="Neutro" fill="#FFC107" />
          <Bar dataKey="Negativo" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <h3 className="font-bold mb-2">Exemplos de Comentários:</h3>
        <ul>
          {Object.entries(socialMediaComments).map(([sentiment, comment]) => (
            <li key={sentiment} className="mb-2">
              <span className="font-semibold">{sentiment}:</span> {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Análise Competitiva - Bancos Digitais Brasil</h1>
      
      <div className="mb-4">
        <button 
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {setActiveTab('overview'); setSelectedBank(null);}}
        >
          Visão Geral
        </button>
        <button 
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {setActiveTab('products'); setSelectedBank(null);}}
        >
          Detalhes Produtos
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'social' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => {setActiveTab('social'); setSelectedBank(null);}}
        >
          Redes Sociais
        </button>
      </div>

      {activeTab === 'overview' && !selectedBank && (
        <>
          <h2 className="text-xl font-bold mb-4">Market Share</h2>
          {renderMarketShareCharts()}
          <h2 className="text-xl font-bold mb-2">Scores dos Competidores</h2>
          {renderCompetitorCards()}
        </>
      )}
      {activeTab === 'overview' && selectedBank && renderBankDetails()}
      {activeTab === 'products' && renderProductDetailsTab()}
      {activeTab === 'social' && renderSocialMediaTab()}
    </div>
  );
};

export default Dashboard;
