import { useGetVisaRequirementsQuery } from '@/services/api/dashboardSlice';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useEffect } from 'react';

interface GeneratePdfProps {
    addData: any;
}
const GeneratePdf: React.FC<GeneratePdfProps> = ({ addData }) => {
    const { data: visaRequirements } = useGetVisaRequirementsQuery({
        countryId: String(addData?.country?.id),
        visaTypeId: String(addData?.visa_type?.id),
        stateOfResidence: addData?.state_of_residence,
    });

    console.log('visaRequirement', visaRequirements, addData);

    useEffect(() => {
        if (visaRequirements && visaRequirements.length > 0) {
            const checklist = visaRequirements[0]?.checklist || [];

            // Create a new jsPDF document
            const doc = new jsPDF('portrait', 'pt', 'a4');

            // Set font size and add title
            doc.setFontSize(16);
            doc.text('Visa Requirements Checklist', 40, 50);

            // Add checklist items
            doc.setFontSize(12);
            checklist.forEach((item: any, index: any) => {
                doc.text(`${index + 1}. ${item}`, 40, 80 + index * 20); // Adjust spacing as needed
            });

            // Save or display the PDF
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank'); // Open the PDF in a new tab
        }
    }, [visaRequirements, addData]);

    return <div>hello</div>;
};

export default GeneratePdf;
