import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const WealthDistributionDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(2020);
  
  // Historical data compiled from multiple sources
  const wealthDistributionData = [
    // 1920s-1930s - Great Depression era
    { year: 1925, top1: 44.2, next9: 33.1, next40: 20.8, bottom50: 1.9, topTaxRate: 25, unionRate: 11.6, hasWealthTax: false },
    { year: 1930, top1: 44.8, next9: 32.7, next40: 20.4, bottom50: 2.1, topTaxRate: 25, unionRate: 11.6, hasWealthTax: false },
    { year: 1935, top1: 42.5, next9: 32.3, next40: 22.4, bottom50: 2.8, topTaxRate: 63, unionRate: 13.2, hasWealthTax: true },
    { year: 1940, top1: 36.4, next9: 34.0, next40: 25.8, bottom50: 3.8, topTaxRate: 81.1, unionRate: 26.9, hasWealthTax: true },
    
    // 1940s-1950s - Post WWII boom
    { year: 1945, top1: 29.8, next9: 35.2, next40: 29.9, bottom50: 5.1, topTaxRate: 94, unionRate: 33.4, hasWealthTax: true },
    { year: 1950, top1: 28.1, next9: 35.8, next40: 30.9, bottom50: 5.2, topTaxRate: 91, unionRate: 31.5, hasWealthTax: true },
    { year: 1955, top1: 29.8, next9: 35.9, next40: 29.6, bottom50: 4.7, topTaxRate: 91, unionRate: 33.2, hasWealthTax: true },
    { year: 1960, top1: 31.4, next9: 35.6, next40: 28.9, bottom50: 4.1, topTaxRate: 91, unionRate: 31.4, hasWealthTax: true },
    
    // 1960s-1970s
    { year: 1965, top1: 32.5, next9: 36.1, next40: 27.9, bottom50: 3.5, topTaxRate: 70, unionRate: 28.4, hasWealthTax: true },
    { year: 1970, top1: 30.6, next9: 36.3, next40: 29.5, bottom50: 3.6, topTaxRate: 71.75, unionRate: 27.4, hasWealthTax: true },
    { year: 1975, top1: 28.4, next9: 36.4, next40: 31.1, bottom50: 4.1, topTaxRate: 70, unionRate: 25.5, hasWealthTax: true },
    { year: 1980, top1: 27.1, next9: 36.2, next40: 32.1, bottom50: 4.6, topTaxRate: 70, unionRate: 23.0, hasWealthTax: true },
    
    // 1980s-1990s - Reagan/Bush/Clinton era
    { year: 1985, top1: 30.5, next9: 36.5, next40: 29.2, bottom50: 3.8, topTaxRate: 50, unionRate: 18.0, hasWealthTax: true },
    { year: 1990, top1: 33.8, next9: 37.2, next40: 26.0, bottom50: 3.0, topTaxRate: 28, unionRate: 16.1, hasWealthTax: true },
    { year: 1995, top1: 34.6, next9: 37.5, next40: 25.2, bottom50: 2.7, topTaxRate: 39.6, unionRate: 14.9, hasWealthTax: true },
    { year: 2000, top1: 36.2, next9: 37.4, next40: 24.0, bottom50: 2.4, topTaxRate: 39.6, unionRate: 13.5, hasWealthTax: true },
    
    // 2000s-2010s
    { year: 2005, top1: 36.3, next9: 38.6, next40: 23.0, bottom50: 2.1, topTaxRate: 35, unionRate: 12.5, hasWealthTax: true },
    { year: 2010, top1: 34.1, next9: 40.3, next40: 23.6, bottom50: 2.0, topTaxRate: 35, unionRate: 11.9, hasWealthTax: true },
    { year: 2015, top1: 37.8, next9: 38.5, next40: 21.7, bottom50: 2.0, topTaxRate: 39.6, unionRate: 11.1, hasWealthTax: true },
    { year: 2020, top1: 38.2, next9: 38.1, next40: 21.7, bottom50: 2.0, topTaxRate: 37, unionRate: 10.3, hasWealthTax: true },
    
    // Most recent
    { year: 2023, top1: 39.0, next9: 38.2, next40: 20.8, bottom50: 2.0, topTaxRate: 37, unionRate: 10.0, hasWealthTax: true },
    { year: 2024, top1: 39.3, next9: 38.0, next40: 20.7, bottom50: 2.0, topTaxRate: 37, unionRate: 9.9, hasWealthTax: true },
    { year: 2025, top1: 39.6, next9: 37.9, next40: 20.5, bottom50: 2.0, topTaxRate: 37, unionRate: 9.8, hasWealthTax: true },
  ];

  // Find the data for the selected year or the closest available year
  const findClosestYearData = (year) => {
    const sortedData = [...wealthDistributionData].sort((a, b) => 
      Math.abs(a.year - year) - Math.abs(b.year - year)
    );
    return sortedData[0];
  };

  const currentYearData = findClosestYearData(selectedYear);
  
  // Prepare data for pie chart
  const pieChartData = [
    { name: 'Top 1%', value: currentYearData.top1 },
    { name: 'Next 9%', value: currentYearData.next9 },
    { name: 'Next 40%', value: currentYearData.next40 },
    { name: 'Bottom 50%', value: currentYearData.bottom50 }
  ];
  
  // Colors for the pie chart
  const COLORS = ['#c62828', '#ad1457', '#6a1b9a', '#4527a0'];
  
  // Format the tooltip value for percentages
  const formatTooltipValue = (value) => `${value.toFixed(1)}%`;

  const handleSliderChange = (value) => {
    setSelectedYear(value[0]);
  };

  // To make year labels more readable, select fewer years to display as ticks
  const yearTicks = wealthDistributionData.filter((_, index) => index % 3 === 0).map(item => item.year);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-slate-50 rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">U.S. Wealth Distribution & Economic Metrics</h1>
        <h2 className="text-xl text-gray-600">1925 - 2025</h2>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="font-medium">1925</span>
          <span className="font-bold text-lg">{selectedYear}</span>
          <span className="font-medium">2025</span>
        </div>
        <Slider 
          defaultValue={[2020]} 
          min={1925} 
          max={2025} 
          step={1} 
          onValueChange={handleSliderChange}
          className="mb-4"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Wealth Distribution in {currentYearData.year}</CardTitle>
            <CardDescription>Percentage of total wealth held by each group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value.toFixed(1)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Economic Indicators in {currentYearData.year}</CardTitle>
            <CardDescription>Tax rates and union membership</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Top Marginal Tax Rate</h3>
                <div className="flex items-center mt-1">
                  <div 
                    className="h-4 bg-purple-600 rounded"
                    style={{ width: `${Math.min(100, currentYearData.topTaxRate)}%` }}
                  ></div>
                  <span className="ml-2 font-bold">{currentYearData.topTaxRate}%</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Union Membership</h3>
                <div className="flex items-center mt-1">
                  <div 
                    className="h-4 bg-blue-600 rounded"
                    style={{ width: `${currentYearData.unionRate * 3}%` }}
                  ></div>
                  <span className="ml-2 font-bold">{currentYearData.unionRate}%</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Wealth Tax Status</h3>
                <div className="mt-1 font-bold">
                  {currentYearData.hasWealthTax ? 
                    <span className="text-green-600">Estate/Inheritance taxes in effect</span> : 
                    <span className="text-red-600">No wealth taxes</span>
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="wealth-over-time">
        <TabsList className="mb-4">
          <TabsTrigger value="wealth-over-time">Wealth Distribution Over Time</TabsTrigger>
          <TabsTrigger value="tax-rates">Top Tax Rates</TabsTrigger>
          <TabsTrigger value="union-membership">Union Membership</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wealth-over-time">
          <Card>
            <CardHeader>
              <CardTitle>Wealth Distribution Trends (1925-2025)</CardTitle>
              <CardDescription>Percentage of total wealth held by each group over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={wealthDistributionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      ticks={yearTicks}
                    />
                    <YAxis 
                      label={{ value: 'Percentage of Total Wealth', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, null]} />
                    <Legend />
                    <Area type="monotone" dataKey="top1" stackId="1" stroke="#c62828" fill="#c62828" name="Top 1%" />
                    <Area type="monotone" dataKey="next9" stackId="1" stroke="#ad1457" fill="#ad1457" name="Next 9%" />
                    <Area type="monotone" dataKey="next40" stackId="1" stroke="#6a1b9a" fill="#6a1b9a" name="Next 40%" />
                    <Area type="monotone" dataKey="bottom50" stackId="1" stroke="#4527a0" fill="#4527a0" name="Bottom 50%" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax-rates">
          <Card>
            <CardHeader>
              <CardTitle>Top Marginal Tax Rates (1925-2025)</CardTitle>
              <CardDescription>Historical top federal income tax rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={wealthDistributionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      ticks={yearTicks}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      label={{ value: 'Tax Rate (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, "Top Tax Rate"]} />
                    <Legend />
                    <Line type="monotone" dataKey="topTaxRate" stroke="#8884d8" name="Top Marginal Tax Rate" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="union-membership">
          <Card>
            <CardHeader>
              <CardTitle>Union Membership Rates (1925-2025)</CardTitle>
              <CardDescription>Percentage of workforce in labor unions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={wealthDistributionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      ticks={yearTicks}
                    />
                    <YAxis 
                      domain={[0, 40]}
                      label={{ value: 'Union Membership (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, "Union Membership"]} />
                    <Legend />
                    <Line type="monotone" dataKey="unionRate" stroke="#2196f3" name="Union Membership Rate" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Note: Data is compiled from multiple historical sources including the Federal Reserve, IRS, Bureau of Labor Statistics, and academic research. Some data points are interpolated between available years.</p>
        <p>The wealth tax status indicates the presence of significant federal estate/inheritance taxes, not direct wealth taxation which has not been implemented at the federal level in the US.</p>
      </div>
    </div>
  );
};

export default WealthDistributionDashboard;