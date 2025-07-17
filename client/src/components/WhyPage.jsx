import React from 'react';

const WhyPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6">
      
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#1057EC]">
        Why Do You Have to Vaccinate?
      </h1>

      {/* Paragraph */}
      <p className="italic text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
        - Vaccination builds your immunity against life-threatening diseases.<br />
        - It helps stop the spread of infections within your community.<br />
        - Protects vulnerable groups like infants and the elderly.<br />
        - It’s a simple step with a powerful impact on public health.
      </p>

    </div>
  );
};

export default WhyPage;
