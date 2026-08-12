import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# 1. Add Legend to recharts import
content = content.replace("import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';", "import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';")

# 2. Add EXPORT_PROJECTIONS data
export_data = """
  const REVENUE_DATA = [
"""
new_export_data = """
  const EXPORT_PROJECTIONS = [
    { quarter: "Q1", CTC: 45000, Orthodox: 12000, SilverNeedle: 3500 },
    { quarter: "Q2", CTC: 52000, Orthodox: 15000, SilverNeedle: 4200 },
    { quarter: "Q3", CTC: 61000, Orthodox: 18000, SilverNeedle: 5100 },
    { quarter: "Q4", CTC: 48000, Orthodox: 14000, SilverNeedle: 4000 }
  ];
  const REVENUE_DATA = [
"""
content = content.replace(export_data, new_export_data)

# 3. Add the chart to the ERP panel
charts_section_end = """
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
"""

new_chart_html = """
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    
                    {/* QUARTERLY PROJECTIONS CHART (FULL WIDTH) */}
                    <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none mt-8">
                      <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wide mb-6">Quarterly Export Volume Projections (kg)</h3>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={EXPORT_PROJECTIONS} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} tickFormatter={(val) => `${val/1000}k`} />
                            <RechartsTooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: 0, border: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 'bold' }} />
                            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} iconType="square" />
                            <Bar dataKey="CTC" stackId="a" fill="#111111" />
                            <Bar dataKey="Orthodox" stackId="a" fill="#6b7280" />
                            <Bar dataKey="SilverNeedle" stackId="a" fill="#d1d5db" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
"""
content = content.replace(charts_section_end, new_chart_html)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
