document.addEventListener("DOMContentLoaded", () => {

    const SUPABASE_URL = 'https://ssczfiqgnronmxopvpyw.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzY3pmaXFnbnJvbm14b3B2cHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1OTA0MzMsImV4cCI6MjAzODE2NjQzM30.MXkj7nwXXClxYyyC9nP6-KCCHUrji3NRGev4Dff7lfo';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    const shopContainer = document.getElementById('shop-container');

    const fetchData = async () => {
        try {
            // Fetch clothing data
            const { data: clothingData, error: clothingError } = await supabaseClient
                .from('clothing')
                .select('*');

            if (clothingError) {
                console.error('Error fetching clothing data:', clothingError);
                return;
            }

            for (const item of clothingData) {
                // Fetch the first image for each clothing item
                const { data: images, error: imagesError } = await supabaseClient
                    .from('images')
                    .select('*')
                    .eq('clothing_id', item.id)
                    .limit(1);

                if (imagesError) {
                    console.error('Error fetching images:', imagesError);
                    return;
                }

                // Generate the card HTML
                const imageUrl = images.length > 0 ? images[0].image_url : 'default-image.jpg';
                const cardHTML = `
                    <div class="card">
                        <img src="${imageUrl}" alt="Image of ${item.title}">
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <div class="price">£${item.value}</div>
                    </div>
                `;

                // Append the card to the container
                shopContainer.innerHTML += cardHTML;
            }

            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = card.getAttribute('data-id');
                    window.location.href = `item.html?id=${id}`;
                });
            });
            
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    fetchData();

})