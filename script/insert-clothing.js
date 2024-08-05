document.addEventListener("DOMContentLoaded", () => {

    // Supabase
    const SUPABASE_URL = 'https://ssczfiqgnronmxopvpyw.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzY3pmaXFnbnJvbm14b3B2cHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1OTA0MzMsImV4cCI6MjAzODE2NjQzM30.MXkj7nwXXClxYyyC9nP6-KCCHUrji3NRGev4Dff7lfo';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const form = document.getElementById('insertForm');

    // Fetch and display clothing data from the database
    const fetchData = async () => {
        try {
            const { data, error } = await supabaseClient
                .from('clothing')
                .select('*');
            
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                console.log('Data fetched:', data);
                form.reset();
                displayData(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // Fetch and display image from the database
    const fetchImages = async (clothingId) => {
        try {
            const { data, error } = await supabaseClient
                .from('images')
                .select('*')
                .eq('clothing_id', clothingId);

            if (error) {
                console.error('Error fetching images:', error);
                return [];
            }
            return data;
        } catch (error) {
            console.error('Error:', error.message);
            return [];
        }
    };

    // Display data in the grid
    const displayData = async(data) => {
        const gridBody = document.getElementById('grid-body');
        gridBody.innerHTML = ''; // Clear existing rows
        for (const item of data) {
            const row = document.createElement('div');
            row.className = 'flex-table-row';
            row.dataset.id = item.id;
            
            const images = await fetchImages(item.id);

            const imagesHTML = images.map(img => `<img src="${img.image_url}" alt="Image">`).join('');

            row.innerHTML = `
                <div class="flex-table-cell">${item.title}</div>
                <div class="flex-table-cell">${item.description}</div>
                <div class="flex-table-cell">${item.value}</div>
                <div class="flex-table-cell">${item.size}</div>
                <div class="flex-table-cell">${item.type}</div>
                <div class="flex-table-cell">${item.gender}</div>
                <div class="flex-table-cell">${item.colour}</div>
                <div class="flex-table-cell">${item.stock_count}</div>
                <div class="flex-table-cell images">${imagesHTML}</div>
                <div class="flex-table-cell" title="Add image"><span class="add-btn">+</span></div>
                <div class="flex-table-cell" style="max-width: 25px;" title="Delete record"><span class="delete-btn">X</span></div>
            `;
            gridBody.appendChild(row);
        }

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                if (confirm("Delete record?") == true) {
                    const row = event.target.closest('.flex-table-row');
                    const id = row.dataset.id;
                    await deleteRecord(id, 'clothing');
                }
                
            });
        });

        document.querySelectorAll('.add-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const row = event.target.closest('.flex-table-row');
                const id = row.dataset.id;
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.onchange = async () => {
                    const file = fileInput.files[0];
                    if (file) {
                        await uploadImage(id, file);
                    }
                };
                fileInput.click();
            });
        });
    };

    const deleteRecord = async (id, table) => {
        try {
            const { error } = await supabaseClient
                .from(table)
                .delete()
                .eq(table == 'clothing' ? 'eq' : 'fileName', id);
            
            if (error) {
                console.error(`Error deleting data from ${table}:`, error);
            } else {
                console.log(`Data deleted from ${table}`);
                alert(`Delete from ${table} successful!`);
                fetchData(); // Refresh the grid
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const uploadImage = async (id, file) => {
        const fileName = `${id}-${file.name}`;
        try {
            const { data, error } = await supabaseClient.storage
                .from('uploads')
                .upload(fileName, file);

            if (error) {
                console.error('Error uploading image:', error);
            } else {
                console.log('Image uploaded:', data);
                const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;
                await saveImageMetadata(id, imageUrl, fileName);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const saveImageMetadata = async (id, imageUrl, fileName) => {
        try {
            const { data, error } = await supabaseClient
                .from('images')
                .insert([{ clothing_id: id, image_url: imageUrl, fileName: fileName }]);

            if (error) {
                console.error('Error saving image metadata:', error);
            } else {
                console.log('Image metadata saved:', data);
                alert('Image uploaded successfully!');
                fetchData(); // Refresh the grid if necessary
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

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
                fetchData(); // Refresh the grid
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    fetchData();

    // Modal
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal .close');
    let currentRow = null

    document.addEventListener('click', async (event) => {

        if (event.target.matches('.flex-table-cell.images img')) {
            currentRow = event.target.closest('.flex-table-row');
            const imageUrl = event.target.src;
            modalTitle.innerText = currentRow.dataset.title;
            modalImage.src = imageUrl;
            modal.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        currentRow = null;
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            // currentRow = null;
        }
    });

    document.getElementById('cropBtn').addEventListener('click', () => {
        alert('Crop functionality not implemented yet.');
    });

    document.getElementById('resizeBtn').addEventListener('click', () => {
        alert('Resize functionality not implemented yet.');
    });

    document.getElementById('replaceBtn').addEventListener('click', () => {
        alert('Replace functionality not implemented yet.');
    });

    document.getElementById('deleteBtn').addEventListener('click', async () => {
        const imageUrl = modalImage.src;
        const fileName = imageUrl.split('/').pop();
    
        if (!confirm('Are you sure you want to delete this image?')) return;

        console.log(fileName)
    
        try {
            // Delete image from the bucket
            const { data, error } = await supabaseClient.storage
                .from('uploads')
                .remove([fileName]);
    
            // if (deleteError) {
            //     throw new Error(`Error deleting image from storage: ${deleteError.message}`);
            // }

            await deleteRecord(fileName, 'images')
    
            modal.style.display = 'none';
    
        } catch (error) {
            console.error(error.message);
            alert('Error deleting image. Please try again.');
        }
    });
    
    

    let croppieInstance;

    document.getElementById('cropBtn').addEventListener('click', () => {
        // Create a Croppie instance
        croppieInstance = new Croppie(modalImage, {
            viewport: { width: 100, height: 100 },
            boundary: { width: 400, height: 400 },
            showZoomer: true
        });
        
        croppieInstance.bind({
            url: modalImage.src
        }).then(() => {
            croppieInstance.result('blob').then((blob) => {
                // Handle the cropped image blob here
            });
        });
    });


});