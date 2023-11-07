'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function FileUpload() {
    //NOTE: We have the ability to create and populate a database but for the purpose of the demo we found it easier
    //to hard code the data. If you uncomment the use effec below and set the db up with the migration files/seeder, this should function
    //identically
    //In addition, the data here may not be accurate, some of the data has been zero'd out so something will always trigger an upper_limit
    const [guidelines, setGuidelines] = useState<any>([{
        chemical: 'Aluminum',
        upper_limit: '0.0001',
        lower_limit: '0.0',
        units: 'mg/L',
        type: 'DRINK',
        org: 'CDNGOV',
        exceeds_upper_limit_message: 'The ammount of Aluminum found in this sample can cause neuromuscular effects (hind- and fore-limb grip strength, foot splay), urinary tract effects and general toxicity when consumed. The Aluminum in this sample exceeds this value by',
        exceeds_lower_limit_message: 'N/A'
      },
      {
        chemical: 'Nitrite',
        upper_limit: '1',
        lower_limit: '0.0',
        units: 'mg/L',
        type: 'DRINK',
        org: 'CDNGOV',
        exceeds_upper_limit_message: 'The ammount of Nitrite found in this sample can cause methaemoglobinaemia (blue baby syndrome) in bottle-fed infants less than 6 months of age. Identified as potential carcinogen.',
        exceeds_lower_limit_message: 'N/A'
      },
      {
        chemical: 'Lead',
        upper_limit: '0.005',
        lower_limit: '0.0',
        units: 'mg/L',
        type: 'DRINK',
        org: 'CDNGOV',
        exceeds_upper_limit_message: 'The ammount of Lead found in this sample can cause reduced intelligence in children measured as decreases in IQ is the most sensitive and well established health effect of lead exposure. There is no known safe exposure level to lead. Guidelines state as low as possible.',
        exceeds_lower_limit_message: 'N/A'
      },
      {
        chemical: 'Manganese',
        upper_limit: '0.12',
        lower_limit: '0.0',
        units: 'mg/L',
        type: 'DRINK',
        org: 'CDNGOV',
        exceeds_upper_limit_message: 'The ammount of Manganese found in this sample can cause effects on neurological development and behaviour; deficits in memory, attention, and motor skills.',
        exceeds_lower_limit_message: 'N/A'
      },
      {
        chemical: 'Mercury',
        upper_limit: '0.001',
        lower_limit: '0.0',
        units: 'mg/L',
        type: 'DRINK',
        org: 'CDNGOV',
        exceeds_upper_limit_message: 'The ammount of Mercury found in this sample can cause irreversible neurological symptoms',
        exceeds_lower_limit_message: 'N/A'
      },
      {
        chemical: 'Magnesium',
        upper_limit: '0.001',
        lower_limit: '0.0',
        units: 'mg/L',
        type: 'DRINK',
        org: 'CDNGOV',
        exceeds_upper_limit_message: 'The ammount of Magnesium found in this sample can cause irreversible neurological symptoms. The Magnesium in this sample exceeds the recommended value by ',
        exceeds_lower_limit_message: 'N/A'
      },
      {
        chemical: 'pH',
        upper_limit: '0.0',
        lower_limit: '10.5',
        units: 'N/A',
        type: 'ECO',
        org: 'CDNGOV',
        exceeds_upper_limit_message: 'The control of pH is important to maximize treatment effectiveness, control corrosion and reduce leaching from distribution system and plumbing components. The pH in this sample exceeds this value by',
        exceeds_lower_limit_message: 'The control of pH is important to maximize treatment effectiveness, control corrosion and reduce leaching from distribution system and plumbing components.'
      }]);
    const [workbook, setWorkbook] = useState<FileRow[]>([]);
    const [outliers, setOutliers] = useState<Outlier[]>([]);

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

    interface Outlier {
        name?: string;
        exceeds_upper_limit_message?: string;
        exceeds_lower_limit_message?: string;
        upper_diff?: number;
        lower_diff?: number;
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
        for(let i = sheetBetaRange[0]; i <= sheetBetaRange[1]; i++) {
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

    // Purpose: for each workbook entry, its finds the corresponding guideline and collects 
    //    measurements that exceed a givien guideline into an array
    function compare() {
        var cRecord: any; //placeholder for current record
        var cMatch; //placeholder for current guideline
        var _outliers: any =[]; //array of outliers

        for (let i=0; i < guidelines.length; i++) {
            cRecord = guidelines[i]; //current record
            cMatch = workbook.filter(w => w.analyte?.includes(cRecord.chemical));

            for(let j=0; j < cMatch.length; j++) {
                let cOutlier: Outlier = {name: cMatch[j].analyte, units: cMatch[j].units};
                if(parseFloat(cMatch[j].results as string) < parseFloat(cRecord.lower_limit)) {
                    cOutlier.exceeds_lower_limit_message = cRecord.exceeds_lower_limit_message;
                }
                if (parseFloat(cMatch[j].results as string) > parseFloat(cRecord.upper_limit)) {
                    cOutlier.exceeds_upper_limit_message = cRecord.exceeds_upper_limit_message;
                    cOutlier.upper_diff = parseFloat(cMatch[j].results as string) - parseFloat(cRecord.upper_limit);
                }
                console.log(cMatch[j], cOutlier, cRecord);
                if(cOutlier.upper_diff && cOutlier.upper_diff > 0) {
                    _outliers.push(cOutlier);
                }
            }
        }
        setOutliers(_outliers);
    }

    useEffect(() => {
        document.title = "File Uploader"
    }, []);

    useEffect(() => {
        if(workbook.length > 0) compare();
    }, [workbook]);

    /*
    useEffect(() => {
        const fetchGuidelines = async () => {
            const _guidelinesRequest = await fetch('/api', {method: 'GET'});
            const _guidelines = await _guidelinesRequest.json();
            setGuidelines(_guidelines.body);
        }
        fetchGuidelines();
    }, []);
    */

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
            <div>
            {outliers.map((row, index) => 
                <div key={index.toString()} className="">
                    <div className="header">
                        <b>{row.name}</b>
                    </div>
                    <div className="message">
                        {row.exceeds_upper_limit_message} {row.upper_diff} {row.units}
                    </div>
                </div>
            )}
            </div>
            <button onClick={() => {setWorkbook([]); setOutliers([])}} className="bg-gradient-to-br from-[#04619F] to-[#033c5a] text-white py-3 px-6 rounded-md transition-colors mt-4 hover:from-[#033c5a] hover:to-[#02253b] relative z-10">
                Clear
            </button>
        </div>
        }
    </>);
};
