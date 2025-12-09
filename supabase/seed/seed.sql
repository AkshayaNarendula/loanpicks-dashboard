INSERT INTO products (
  name, bank, type, rate_apr, min_income, min_credit_score,
  tenure_min_months, tenure_max_months, processing_fee_pct,
  prepayment_allowed, disbursal_speed, docs_level, summary, faq
)
VALUES
('Axis Bank Education Loan', 'AXIS', 'education', 8.9, 12000, 650, 12, 84, 1.25, true, 'fast', 'medium', 'Great for students.',
 '[{"q":"Repayment start?","a":"After course completion"}]'),

('Union Bank Vehicle Plus Loan', 'UNION BANK', 'vehicle', 9.1, 18000, 680, 12, 60, 1.5, true, 'fast', 'low', 'Ideal for new vehicles.',
 '[{"q":"Max tenure?","a":"Up to 60 months"}]'),

('HDFC Home Loan Advantage', 'HDFC', 'home', 8.2, 35000, 700, 60, 360, 1.0, true, 'standard', 'high', 'Perfect for salaried employees.',
 '[{"q":"Balance transfer?","a":"Yes, available"}]'),

('SBI Xpress Credit Loan', 'SBI', 'personal', 10.4, 20000, 640, 12, 72, 1.8, true, 'fast', 'low', 'Quick approval personal loan.',
 '[{"q":"Documents needed?","a":"Aadhar, PAN, Salary slips"}]'),

('Yes Bank Debt Consolidation Loan', 'YES BANK', 'debt_consolidation', 11.0, 15000, 630, 12, 60, 2.0, false, 'slow', 'medium', 
 'Good for consolidating multiple loans.',
 '[{"q":"Part payment allowed?","a":"No"}]'),

('Bajaj Auto Loan', 'Bajaj', 'vehicle', 8.5, 10000, 600, 6, 36, 2.5, true, 'fast', 'low',
 'Low docs bike loan.',
 '[{"q":"Two wheeler loan?","a":"Yes"}]'),

('HDFC Education Loan Extra', 'HDFC', 'education', 8.5, 14000, 650, 24, 96, 1.2, true, 'standard', 'medium',
 'Extra benefits for education.',
 '[{"q":"Moratorium period?","a":"Up to 1 year"}]'),

('ICICI Credit Line Max', 'ICICI', 'credit_line', 16.5, 20000, 680, 1, 0, 0.0, true, 'instant', 'low',
 'Flexible credit line loan.',
 '[{"q":"Usage limit?","a":"Up to 4 Lakhs"}]'),

('HDFC Flexi Personal Loan', 'HDFC', 'personal', 10.5, 25000, 700, 12, 60, 1.5, true, 'fast', 'low',
 'Suitable for salaried individuals.',
 '[{"q":"Is prepayment allowed?","a":"Yes, no charges"}]'),

('SBI Global Ed-Vantage Loan', 'SBI', 'education', 8.2, 15000, 650, 24, 84, 1.0, true, 'standard', 'standard',
 'For higher studies abroad.',
 '[{"q":"Coverage?","a":"Tuition + living expenses"}]'),

('Kotak Vehicle Loan Prime', 'Kotak', 'vehicle', 9.0, 18000, 640, 12, 48, 1.75, true, 'fast', 'low',
 'Affordable car loan.',
 '[{"q":"Max loan amount?","a":"Up to 12 Lakhs"}]'),

('PNB Home Dream Loan', 'PNB', 'home', 8.0, 30000, 720, 120, 360, 0.75, true, 'slow', 'high',
 'Home loan with low APR.',
 '[{"q":"Insurance mandatory?","a":"Yes"}]'),

('ICICI Insta Loan', 'ICICI', 'personal', 12.5, 20000, 650, 12, 48, 2.0, true, 'instant', 'low',
 'Instant approval personal loan.',
 '[{"q":"Approval time?","a":"Within 5 minutes"}]'),

('Yes Bank Students Loan', 'YES BANK', 'education', 8.7, 10000, 600, 12, 84, 1.1, true, 'fast', 'medium',
 'Loan designed for students.',
 '[{"q":"Collateral?","a":"Not required"}]'),

('Union Bank Housing Pro', 'UNION BANK', 'home', 8.3, 35000, 710, 120, 300, 0.8, true, 'standard', 'high',
 'Housing loan for new buyers.',
 '[{"q":"Women benefit?","a":"Lower APR for women"}]');
