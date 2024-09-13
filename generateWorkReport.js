// Sample array of sentences
const sentences = [
    "fix: removed comments",
    "merge: added new feature branch",
    "refactor: cleaned up code",
    "feat: added user authentication"
];

// Function to format the array and include a report header
export default function generateWorkReport(arr) {
    // Define mappings for different types
    const typeMappings = {
        "fix": "I have fixed",
        "merge": "I have merged",
        "refactor": "I have refactored",
        "feat": "I have added"
    };

    // Format the sentences
    const formattedSentences = arr.map(sentence => {
        // Split the sentence into type and description
        const [type, description] = sentence.split(':').map(part => part.trim());
        // Get the appropriate phrase based on the type
        const action = typeMappings[type] || "Performed";
        // Return the formatted sentence
        return `${action} ${description}`;
    });

    // Generate the report header
    const reportHeader = "Today's Work Report\n";
    const formattedReport = formattedSentences.join('\n');
    
    // Combine header and formatted sentences
    return `${reportHeader}${formattedReport}`;
}

