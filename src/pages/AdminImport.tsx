import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Upload, CheckCircle2, AlertCircle, Loader2, FileText, Download } from 'lucide-react';

interface ParsedRow {
  line: number;
  med_name: string;
  supplement_name: string;
  severity: string;
  summary_short: string;
  clinical_effect: string;
  mechanism: string;
  management: string;
  evidence_grade: string;
  confidence: string;
  citations: string;
  errors: string[];
}

interface ValidationReport {
  valid: ParsedRow[];
  invalid: ParsedRow[];
  totalLines: number;
}

export default function AdminImport() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState<ValidationReport | null>(null);
  const [importBatch, setImportBatch] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [importResult, setImportResult] = useState<any>(null);

  const parseCSV = (text: string): ParsedRow[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const expectedHeaders = [
      'med_name',
      'supplement_name',
      'severity',
      'summary_short',
      'clinical_effect',
      'mechanism',
      'management',
      'evidence_grade',
      'confidence',
      'citations'
    ];

    const headerMap = new Map<string, number>();
    expectedHeaders.forEach(header => {
      const idx = headers.indexOf(header);
      if (idx !== -1) headerMap.set(header, idx);
    });

    const rows: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;

      const cols = parseCSVLine(line);
      const row: ParsedRow = {
        line: i + 1,
        med_name: (cols[headerMap.get('med_name') || 0] || '').trim(),
        supplement_name: (cols[headerMap.get('supplement_name') || 1] || '').trim(),
        severity: (cols[headerMap.get('severity') || 2] || '').trim().toLowerCase(),
        summary_short: normalizeWhitespace(cols[headerMap.get('summary_short') || 3] || ''),
        clinical_effect: normalizeWhitespace(cols[headerMap.get('clinical_effect') || 4] || ''),
        mechanism: normalizeWhitespace(cols[headerMap.get('mechanism') || 5] || ''),
        management: normalizeWhitespace(cols[headerMap.get('management') || 6] || ''),
        evidence_grade: (cols[headerMap.get('evidence_grade') || 7] || '').trim().toUpperCase(),
        confidence: (cols[headerMap.get('confidence') || 8] || '').trim(),
        citations: (cols[headerMap.get('citations') || 9] || '').trim(),
        errors: []
      };

      validateRow(row);
      rows.push(row);
    }

    return rows;
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result.map(s => s.replace(/^"|"$/g, '').trim());
  };

  const normalizeWhitespace = (text: string): string => {
    return text.trim().replace(/\s+/g, ' ');
  };

  const validateRow = (row: ParsedRow): void => {
    if (!row.med_name) row.errors.push('med_name is required');
    if (!row.supplement_name) row.errors.push('supplement_name is required');
    if (!['avoid', 'caution', 'monitor'].includes(row.severity)) {
      row.errors.push('severity must be avoid, caution, or monitor');
    }
    if (!['A', 'B', 'C', 'D'].includes(row.evidence_grade)) {
      row.errors.push('evidence_grade must be A, B, C, or D');
    }

    const conf = parseInt(row.confidence);
    if (isNaN(conf) || conf < 0 || conf > 100) {
      row.errors.push('confidence must be 0-100');
    }

    if (row.summary_short.length < 20) {
      row.errors.push('summary_short must be >= 20 chars');
    }
    if (row.clinical_effect.length < 20) {
      row.errors.push('clinical_effect must be >= 20 chars');
    }
    if (row.mechanism.length < 20) {
      row.errors.push('mechanism must be >= 20 chars');
    }
    if (row.management.length < 20) {
      row.errors.push('management must be >= 20 chars');
    }

    const urls = row.citations.split('|').map(u => u.trim()).filter(Boolean);
    if (urls.length < 1 || urls.length > 3) {
      row.errors.push('citations must have 1-3 URLs separated by |');
    } else {
      for (const url of urls) {
        if (!url.includes('http://') && !url.includes('https://')) {
          row.errors.push(`Invalid URL: ${url}`);
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValidation(null);
      setImportStatus('idle');
    }
  };

  const handleValidate = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      const valid = rows.filter(r => r.errors.length === 0);
      const invalid = rows.filter(r => r.errors.length > 0);

      setValidation({
        valid,
        invalid,
        totalLines: rows.length
      });
    } catch (err) {
      console.error('Parse error:', err);
      alert('Failed to parse CSV');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!validation || validation.valid.length === 0) return;

    const batch = `import_${Date.now()}`;
    setImportBatch(batch);
    setImportStatus('uploading');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('You must be logged in');
        setImportStatus('error');
        return;
      }

      const records = validation.valid.map(row => ({
        med_name: row.med_name,
        supplement_name: row.supplement_name,
        severity: row.severity,
        summary_short: row.summary_short,
        clinical_effect: row.clinical_effect,
        mechanism: row.mechanism,
        management: row.management,
        evidence_grade: row.evidence_grade,
        confidence: parseInt(row.confidence),
        citations: row.citations,
        import_batch: batch,
        processed: false
      }));

      const { error: insertError } = await supabase
        .from('stage_interactions')
        .insert(records);

      if (insertError) {
        console.error('Insert error:', insertError);
        alert('Failed to upload to staging table');
        setImportStatus('error');
        return;
      }

      setImportStatus('processing');

      const processRes = await fetch('/.netlify/functions/admin-process-imports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ import_batch: batch })
      });

      const processData = await processRes.json();

      if (!processRes.ok) {
        setImportStatus('error');
        setImportResult(processData);
        return;
      }

      setImportStatus('success');
      setImportResult(processData);
    } catch (err) {
      console.error('Import error:', err);
      setImportStatus('error');
      setImportResult({ error: err.message });
    }
  };

  const downloadTemplate = () => {
    const template = `med_name,supplement_name,severity,summary_short,clinical_effect,mechanism,management,evidence_grade,confidence,citations
Warfarin,Ginkgo Biloba,avoid,"Ginkgo may increase bleeding risk when combined with warfarin due to antiplatelet effects","Significantly increased bleeding risk, potential for serious hemorrhage","Ginkgo biloba contains compounds that inhibit platelet aggregation and may potentiate anticoagulant effects","Avoid concurrent use; if unavoidable, monitor INR closely and watch for bleeding signs",A,95,https://pubmed.ncbi.nlm.nih.gov/12345678|https://pubmed.ncbi.nlm.nih.gov/87654321`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="text-slate-600 hover:text-slate-900 mb-4 flex items-center gap-2"
          >
            ← Back to Admin
          </button>
          <h1 className="text-3xl font-bold text-slate-900">CSV Import</h1>
          <p className="text-slate-600 mt-2">
            Import drug-supplement interactions from CSV
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Upload CSV</h2>
              <p className="text-sm text-slate-600 mt-1">
                Select a CSV file with the required columns
              </p>
            </div>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 mb-2">
                {file ? file.name : 'Click to select CSV file'}
              </p>
              <p className="text-sm text-slate-500">
                Required: med_name, supplement_name, severity, summary_short, clinical_effect, mechanism, management, evidence_grade, confidence, citations
              </p>
            </label>
          </div>

          {file && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleValidate}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Validate CSV
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {validation && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Validation Report</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600">Total Rows</p>
                  <p className="text-2xl font-bold text-slate-900">{validation.totalLines}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600">Valid Rows</p>
                  <p className="text-2xl font-bold text-green-900">{validation.valid.length}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600">Invalid Rows</p>
                  <p className="text-2xl font-bold text-red-900">{validation.invalid.length}</p>
                </div>
              </div>

              {validation.invalid.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Validation Errors
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {validation.invalid.map((row, idx) => (
                      <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-red-900">Line {row.line}</p>
                        <ul className="text-sm text-red-700 mt-1 list-disc list-inside">
                          {row.errors.map((err, i) => (
                            <li key={i}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {validation.valid.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Preview (first 5 valid rows)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left p-2 font-medium text-slate-700">Med</th>
                          <th className="text-left p-2 font-medium text-slate-700">Supplement</th>
                          <th className="text-left p-2 font-medium text-slate-700">Severity</th>
                          <th className="text-left p-2 font-medium text-slate-700">Grade</th>
                          <th className="text-left p-2 font-medium text-slate-700">Conf</th>
                        </tr>
                      </thead>
                      <tbody>
                        {validation.valid.slice(0, 5).map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-100">
                            <td className="p-2 text-slate-900">{row.med_name}</td>
                            <td className="p-2 text-slate-900">{row.supplement_name}</td>
                            <td className="p-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                row.severity === 'avoid' ? 'bg-red-100 text-red-700' :
                                row.severity === 'caution' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {row.severity}
                              </span>
                            </td>
                            <td className="p-2 text-slate-900">{row.evidence_grade}</td>
                            <td className="p-2 text-slate-900">{row.confidence}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {validation.valid.length > 0 && validation.invalid.length === 0 && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleImport}
                    disabled={importStatus !== 'idle'}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {importStatus === 'idle' && (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Import {validation.valid.length} Rows
                      </>
                    )}
                    {importStatus === 'uploading' && (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Uploading to staging...
                      </>
                    )}
                    {importStatus === 'processing' && (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing imports...
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {importStatus === 'success' && importResult && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Import Successful</h3>
                <p className="text-green-700 mb-4">
                  Successfully imported {importResult.imported} interactions
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Processed:</span> {importResult.processed} rows
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Imported:</span> {importResult.imported} unique interactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {importStatus === 'error' && importResult && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Import Failed</h3>
                <p className="text-red-700 mb-4">{importResult.error || 'Unknown error'}</p>

                {importResult.unmatched_drugs && importResult.unmatched_drugs.length > 0 && (
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="font-medium text-slate-900 mb-2">Unmatched Medications:</p>
                    <ul className="list-disc list-inside text-sm text-slate-700">
                      {importResult.unmatched_drugs.map((name: string, idx: number) => (
                        <li key={idx}>{name}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-slate-600 mt-2">
                      Add these medications to checker_substances before importing
                    </p>
                  </div>
                )}

                {importResult.unmatched_supplements && importResult.unmatched_supplements.length > 0 && (
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">Unmatched Supplements:</p>
                    <ul className="list-disc list-inside text-sm text-slate-700">
                      {importResult.unmatched_supplements.map((name: string, idx: number) => (
                        <li key={idx}>{name}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-slate-600 mt-2">
                      Add these supplements to checker_substances before importing
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
