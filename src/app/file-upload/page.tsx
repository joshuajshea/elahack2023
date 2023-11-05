'use client';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function FileUpload() {
    const [guidelines, setGuidelines] = useState<any>(null);
    const [workbook, setWorkbook] = useState<FileRow[]>([]);

    interface FileRow {
        als_sample_id?: string;
        analysis_date?: string;
        analyte?: string;
        client_sample_id?: string;
        date_sampled?: string;
        detection_limit?: string;
        hold_time_eval?: string;
        matrix?: string;
        method?: string;
        prep_date?: string;
        qc_eval?: string;
        qc_lot?: string;
        qual?: string;
        results?: string;
        "sub-matrix"?: string;
        time_sampled?: string;
        units?: string;
    }

    function parseWorkbook(workbook: XLSX.WorkBook) {
        const report = workbook.Sheets?.["Detailed Report"]
        if(!report) return;
        const range = report['!autofilter']?.ref.split(':');
        if(!range) return;

        let results: Array<FileRow> = [];
        let headers: Array<string> = [];
        const sheetAlphaRange = [range[0].charCodeAt(0), range[1].charCodeAt(0)];
        const sheetBetaRange = [parseInt(range[0].slice(1)), parseInt(range[1].slice(1))];

        for(let i = sheetAlphaRange[0]; i <= sheetAlphaRange[1]; i++) {
                let cell: string = `${String.fromCharCode(i)}9`
                headers.push(
                    (report[cell]?.v)
                        .toString()
                        .toLowerCase()
                        .trim()
                        .replaceAll(' ', '_'));
        }
        for(let i = sheetBetaRange[0] + 10; i <= sheetBetaRange[1]; i++) {
            let entry: FileRow = {};
            let k = 0;
            for(let j = sheetAlphaRange[0]; j <= sheetAlphaRange[1]; j++) {
                let cell: string = `${String.fromCharCode(j)}${i}`
                entry[`${headers[k]}` as keyof FileRow] = report[`${cell}`]?.v; 
                k++;
            }
            results.push(entry);
        }

        results = results.filter(result => !!result.als_sample_id);

        //TODO: BUILD API TO UPLODD THIS TO DB
        setWorkbook(results);
    }

    const handleDropAsync = (e: any) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        if(!e.target) return;
        reader.onload = function(e) {
            var workbook = XLSX.read(e.target?.result);
            parseWorkbook(workbook);
        }
        reader.readAsArrayBuffer(file);
    }

    useEffect(() => {
        const fetchGuidelines = async () => {
            const _guidelinesRequest = await fetch('/api', {method: 'GET'});
            const _guidelines = await _guidelinesRequest.json();
            setGuidelines(_guidelines.body);
        }
        fetchGuidelines();
    }, []);

    return (
    <>
       {workbook.length === 0 ? <div className="flex min-h-screen flex-col items-center justify-start p-8 pt-12 mt-20 relative overflow-hidden">
          <div className="bg-gradient-to-br from-[#04619F] to-[#000000] rounded-full w-96 h-96 flex flex-col items-center justify-center mb-8 border-4 border-green-600">
            <h1 className="text-4xl font-bold text-white text-center mb-2 max-w-md mx-auto p-6 pb-2 flex items-center justify-center">
              Generate Your Report
            </h1>
            <p className="text-white text-center max-w-md mx-auto p-6 pt-2">
            Seamlessly generate a detailed PDF report by simply selecting your .xlxs ALS lab results file. Let our app analyze your sample data with precision and clarity.
            </p>
          </div>
          <form className="file-upload__upload" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="input-file-upload" className="bg-gradient-to-br from-[#04619F] to-[#033c5a] text-white py-3 px-6 rounded-md transition-colors mt-4 hover:from-[#033c5a] hover:to-[#02253b] relative z-10">
              Choose a File
            </label>
            <input type="file" id="input-file-upload" multiple={true} onChange={(e) => handleDropAsync(e)} className="hidden" />
          </form>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
            <path fill="#04619F" fillOpacity="1" d="M0,224L48,224C96,224,192,224,288,208C384,192,480,160,576,160C672,160,768,192,864,197.3C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>: 
        <div>
            {workbook.map(row => 
                <div>{JSON.stringify(row)}</div>
            )}
            <button onClick={() => setWorkbook([])} className="bg-gradient-to-br from-[#04619F] to-[#033c5a] text-white py-3 px-6 rounded-md transition-colors mt-4 hover:from-[#033c5a] hover:to-[#02253b] relative z-10">
                Clear
            </button>
        </div>
        }
    </>);
};