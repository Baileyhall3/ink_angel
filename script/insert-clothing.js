// import supabase from './supabase'

document.addEventListener("DOMContentLoaded", () => {

    const SUPABASE_URL = 'https://ssczfiqgnronmxopvpyw.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzY3pmaXFnbnJvbm14b3B2cHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1OTA0MzMsImV4cCI6MjAzODE2NjQzM30.MXkj7nwXXClxYyyC9nP6-KCCHUrji3NRGev4Dff7lfo';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const form = document.getElementById('insertForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const desc = document.getElementById('desc').value;
        const price = document.getElementById('price').value;
        const size = document.getElementById('size').value;
        const type = document.getElementById('type').value;
        const gender = document.getElementById('gender').value;
        const colour = document.getElementById('colour').value;
        const stock = document.getElementById('stock').value;

        try {
            const { data, error } = await supabaseClient
                .from('clothing')
                .insert([
                    { 
                    title: title, 
                    value: price,
                    size: size, 
                    description: desc, 
                    colour: colour,
                    stock_count: stock, 
                    type: type, 
                    gender: gender, 
                    }
                ]);
            
            if (error) {
                console.error('Error inserting data:', error);
            } else {
                form.reset();
                alert(`New record added!`);
                console.log('Data inserted:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

});