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
       {workbook.length === 0 ? <div className="file-upload">
            <form className="file-upload__upload" onSubmit={(e) => e.preventDefault()}>
                <input type="file" id="input-file-upload" multiple={true} onChange={(e) => handleDropAsync(e)}/>
            </form>
        </div> : 
        <div>
            {workbook.map(row => 
                <div>{JSON.stringify(row)}</div>
            )}
        </div>
        }
    <div>
        <button onClick={() => setWorkbook([])}>
            Clear
        </button>
    </div>
    </>);
}