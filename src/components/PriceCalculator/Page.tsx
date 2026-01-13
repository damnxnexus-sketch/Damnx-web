'use client';
import React, { useState, useMemo } from 'react';
import { Calculator, Code, Smartphone, Database, Cloud, Shield, MessageSquare, CreditCard, BarChart3, Settings, DollarSign, Mail, Download, ChevronRight, Check } from 'lucide-react';

const PricingCalculator = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    projectType: '',
    features: [],
    frontend: '',
    backend: '',
    mobile: '',
    database: '',
    deployment: '',
    maintenance: '',
    country: 'US',
    currency: 'USD'
  });

  // Pricing constants and logic
  const countries = [
    { code: 'US', name: 'United States', currency: 'USD', rate: 1 },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', rate: 0.79 },
    { code: 'EU', name: 'European Union', currency: 'EUR', rate: 0.92 },
    { code: 'IN', name: 'India', currency: 'INR', rate: 83.12 },
    { code: 'AU', name: 'Australia', currency: 'AUD', rate: 1.52 },
    { code: 'CA', name: 'Canada', currency: 'CAD', rate: 1.35 },
    { code: 'JP', name: 'Japan', currency: 'JPY', rate: 148.50 },
    { code: 'SG', name: 'Singapore', currency: 'SGD', rate: 1.34 },
    { code: 'AE', name: 'UAE', currency: 'AED', rate: 3.67 }
  ];

  const projectTypes = [
    { id: 'website', name: 'Website', icon: Code, baseHours: 200, desc: 'Custom web application' },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone, baseHours: 300, desc: 'iOS/Android application' },
    { id: 'web-mobile', name: 'Web + Mobile', icon: Settings, baseHours: 450, desc: 'Full platform suite' },
    { id: 'full-suite', name: 'Full Software Suite', icon: BarChart3, baseHours: 600, desc: 'Enterprise solution' }
  ];

  const features = [
    { id: 'auth', name: 'User Authentication', icon: Shield, hours: 40 },
    { id: 'admin', name: 'Admin Panel', icon: Settings, hours: 80 },
    { id: 'chat', name: 'Real-time Chat', icon: MessageSquare, hours: 60 },
    { id: 'payment', name: 'Payment Integration', icon: CreditCard, hours: 50 },
    { id: 'api', name: 'API Integrations', icon: Code, hours: 45 },
    { id: 'dashboard', name: 'Analytics Dashboard', icon: BarChart3, hours: 70 },
    { id: 'notifications', name: 'Push Notifications', icon: Mail, hours: 35 },
    { id: 'search', name: 'Advanced Search', icon: Settings, hours: 40 }
  ];

  const techStacks = {
    frontend: [
      { id: 'react', name: 'React', multiplier: 1.0 },
      { id: 'vue', name: 'Vue.js', multiplier: 1.0 },
      { id: 'angular', name: 'Angular', multiplier: 1.1 },
      { id: 'nextjs', name: 'Next.js', multiplier: 1.15 }
    ],
    backend: [
      { id: 'nodejs', name: 'Node.js', multiplier: 1.0 },
      { id: 'django', name: 'Django', multiplier: 1.1 },
      { id: 'laravel', name: 'Laravel', multiplier: 1.05 },
      { id: 'dotnet', name: '.NET', multiplier: 1.2 }
    ],
    mobile: [
      { id: 'native', name: 'Native (Swift/Kotlin)', multiplier: 1.3 },
      { id: 'react-native', name: 'React Native', multiplier: 1.0 },
      { id: 'flutter', name: 'Flutter', multiplier: 1.1 }
    ],
    database: [
      { id: 'mysql', name: 'MySQL', multiplier: 1.0 },
      { id: 'postgresql', name: 'PostgreSQL', multiplier: 1.05 },
      { id: 'mongodb', name: 'MongoDB', multiplier: 1.1 }
    ]
  };

  const deploymentOptions = [
    { id: 'shared', name: 'Shared Hosting', cost: 500, monthly: 20 },
    { id: 'vps', name: 'VPS', cost: 1200, monthly: 80 },
    { id: 'cloud', name: 'Cloud (AWS/Azure/GCP)', cost: 2000, monthly: 200 }
  ];

  const maintenanceOptions = [
    { id: 'basic', name: 'Basic (Bug Fixes)', monthly: 300 },
    { id: 'standard', name: 'Standard (Updates + Support)', monthly: 800 },
    { id: 'premium', name: 'Premium (24/7 + Features)', monthly: 1500 }
  ];

  const hourlyRate = 75; // Base USD hourly rate

  const calculateEstimate = useMemo(() => {
    if (!selections.projectType) return null;

    const projectType = projectTypes.find(p => p.id === selections.projectType);
    let totalHours = projectType.baseHours;

    // Add feature hours
    selections.features.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) totalHours += feature.hours;
    });

    // Apply tech stack multipliers
    let techMultiplier = 1.0;
    if (selections.frontend) {
      const tech = techStacks.frontend.find(t => t.id === selections.frontend);
      if (tech) techMultiplier *= tech.multiplier;
    }
    if (selections.backend) {
      const tech = techStacks.backend.find(t => t.id === selections.backend);
      if (tech) techMultiplier *= tech.multiplier;
    }
    if (selections.mobile && selections.projectType !== 'website') {
      const tech = techStacks.mobile.find(t => t.id === selections.mobile);
      if (tech) techMultiplier *= tech.multiplier;
    }
    if (selections.database) {
      const tech = techStacks.database.find(t => t.id === selections.database);
      if (tech) techMultiplier *= tech.multiplier;
    }

    totalHours *= techMultiplier;

    // Calculate breakdown
    const development = totalHours * hourlyRate * 0.55;
    const design = totalHours * hourlyRate * 0.20;
    const testing = totalHours * hourlyRate * 0.15;
    const deployment = deploymentOptions.find(d => d.id === selections.deployment)?.cost || 1000;
    const support = (maintenanceOptions.find(m => m.id === selections.maintenance)?.monthly || 500) * 3;

    const subtotal = development + design + testing + deployment + support;
    
    // Get currency conversion
    const country = countries.find(c => c.code === selections.country);
    const rate = country?.rate || 1;
    const currency = country?.currency || 'USD';

    const convert = (amount) => amount * rate;

    return {
      hours: Math.round(totalHours),
      currency,
      breakdown: {
        development: convert(development),
        design: convert(design),
        testing: convert(testing),
        deployment: convert(deployment),
        support: convert(support)
      },
      total: convert(subtotal),
      range: {
        min: convert(subtotal * 0.85),
        typical: convert(subtotal),
        max: convert(subtotal * 1.20)
      },
      monthly: convert(maintenanceOptions.find(m => m.id === selections.maintenance)?.monthly || 0)
    };
  }, [selections]);

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((s) => (
        <React.Fragment key={s}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
            step >= s ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-500'
          }`}>
            {s}
          </div>
          {s < 4 && (
            <div className={`w-16 h-1 ${step > s ? 'bg-red-600' : 'bg-gray-800'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-red-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">DamnX</span>
              <span className="text-red-600"> Pricing Calculator</span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Get an instant estimate for your software project</p>
        </div>

        <StepIndicator />

        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-red-600">
          {/* Step 1: Project Type */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Code className="w-6 h-6 text-red-600 mr-2" />
                Select Your Project Type
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelections({...selections, projectType: type.id})}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selections.projectType === type.id
                        ? 'border-red-600 bg-red-600 bg-opacity-10'
                        : 'border-gray-700 hover:border-red-600'
                    }`}
                  >
                    <type.icon className="w-10 h-10 text-red-600 mb-3" />
                    <h3 className="text-xl font-bold mb-2">{type.name}</h3>
                    <p className="text-gray-400 text-sm">{type.desc}</p>
                    <p className="text-red-600 text-sm mt-2">~{type.baseHours} hours base</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Features & Location */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Settings className="w-6 h-6 text-red-600 mr-2" />
                Choose Features & Location
              </h2>
              
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Country & Currency</label>
                <select
                  value={selections.country}
                  onChange={(e) => setSelections({
                    ...selections, 
                    country: e.target.value,
                    currency: countries.find(c => c.code === e.target.value)?.currency
                  })}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:border-red-600 focus:outline-none"
                >
                  {countries.map(c => (
                    <option key={c.code} value={c.code}>{c.name} ({c.currency})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Select Features</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => {
                        const newFeatures = selections.features.includes(feature.id)
                          ? selections.features.filter(f => f !== feature.id)
                          : [...selections.features, feature.id];
                        setSelections({...selections, features: newFeatures});
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left flex items-center ${
                        selections.features.includes(feature.id)
                          ? 'border-red-600 bg-red-600 bg-opacity-10'
                          : 'border-gray-700 hover:border-red-600'
                      }`}
                    >
                      <feature.icon className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{feature.name}</div>
                        <div className="text-xs text-gray-400">+{feature.hours}h</div>
                      </div>
                      {selections.features.includes(feature.id) && (
                        <Check className="w-5 h-5 text-red-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Tech Stack */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Database className="w-6 h-6 text-red-600 mr-2" />
                Select Technology Stack
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Frontend</label>
                  <div className="space-y-2">
                    {techStacks.frontend.map(tech => (
                      <button
                        key={tech.id}
                        onClick={() => setSelections({...selections, frontend: tech.id})}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          selections.frontend === tech.id
                            ? 'border-red-600 bg-red-600 bg-opacity-10'
                            : 'border-gray-700 hover:border-red-600'
                        }`}
                      >
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Backend</label>
                  <div className="space-y-2">
                    {techStacks.backend.map(tech => (
                      <button
                        key={tech.id}
                        onClick={() => setSelections({...selections, backend: tech.id})}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          selections.backend === tech.id
                            ? 'border-red-600 bg-red-600 bg-opacity-10'
                            : 'border-gray-700 hover:border-red-600'
                        }`}
                      >
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>

                {selections.projectType !== 'website' && (
                  <div>
                    <label className="block text-sm font-semibold mb-3">Mobile</label>
                    <div className="space-y-2">
                      {techStacks.mobile.map(tech => (
                        <button
                          key={tech.id}
                          onClick={() => setSelections({...selections, mobile: tech.id})}
                          className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                            selections.mobile === tech.id
                              ? 'border-red-600 bg-red-600 bg-opacity-10'
                              : 'border-gray-700 hover:border-red-600'
                          }`}
                        >
                          {tech.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-3">Database</label>
                  <div className="space-y-2">
                    {techStacks.database.map(tech => (
                      <button
                        key={tech.id}
                        onClick={() => setSelections({...selections, database: tech.id})}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          selections.database === tech.id
                            ? 'border-red-600 bg-red-600 bg-opacity-10'
                            : 'border-gray-700 hover:border-red-600'
                        }`}
                      >
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Deployment & Support */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Cloud className="w-6 h-6 text-red-600 mr-2" />
                Deployment & Maintenance
              </h2>

              <div>
                <label className="block text-sm font-semibold mb-3">Deployment Type</label>
                <div className="space-y-3">
                  {deploymentOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelections({...selections, deployment: option.id})}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selections.deployment === option.id
                          ? 'border-red-600 bg-red-600 bg-opacity-10'
                          : 'border-gray-700 hover:border-red-600'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{option.name}</span>
                        <span className="text-red-600">${option.monthly}/mo</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Maintenance Level</label>
                <div className="space-y-3">
                  {maintenanceOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelections({...selections, maintenance: option.id})}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selections.maintenance === option.id
                          ? 'border-red-600 bg-red-600 bg-opacity-10'
                          : 'border-gray-700 hover:border-red-600'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{option.name}</span>
                        <span className="text-red-600">${option.monthly}/mo</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Display */}
              {calculateEstimate && (
                <div className="mt-8 p-6 bg-black rounded-xl border-2 border-red-600">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <DollarSign className="w-6 h-6 text-red-600 mr-2" />
                    Your Project Estimate
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-900 rounded-lg">
                      <div className="text-gray-400 text-sm mb-1">Minimum</div>
                      <div className="text-xl font-bold text-green-500">
                        {formatCurrency(calculateEstimate.range.min, calculateEstimate.currency)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-600 bg-opacity-20 rounded-lg border-2 border-red-600">
                      <div className="text-gray-300 text-sm mb-1">Typical</div>
                      <div className="text-2xl font-bold text-white">
                        {formatCurrency(calculateEstimate.range.typical, calculateEstimate.currency)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-900 rounded-lg">
                      <div className="text-gray-400 text-sm mb-1">Maximum</div>
                      <div className="text-xl font-bold text-red-400">
                        {formatCurrency(calculateEstimate.range.max, calculateEstimate.currency)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Development</span>
                      <span className="font-semibold">{formatCurrency(calculateEstimate.breakdown.development, calculateEstimate.currency)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Design</span>
                      <span className="font-semibold">{formatCurrency(calculateEstimate.breakdown.design, calculateEstimate.currency)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Testing</span>
                      <span className="font-semibold">{formatCurrency(calculateEstimate.breakdown.testing, calculateEstimate.currency)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Deployment</span>
                      <span className="font-semibold">{formatCurrency(calculateEstimate.breakdown.deployment, calculateEstimate.currency)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Support (3 months)</span>
                      <span className="font-semibold">{formatCurrency(calculateEstimate.breakdown.support, calculateEstimate.currency)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Get Detailed Quote
                    </button>
                    <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-800">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
              >
                Previous
              </button>
            )}
            {step < 4 && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!selections.projectType}
                className="ml-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Estimates are approximate. Final pricing may vary based on project complexity.</p>
          <p className="mt-2">Contact us at <span className="text-red-600">contact@damnx.co.in</span> for accurate quotes.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;