document.addEventListener("DOMContentLoaded", () => {

    const SUPABASE_URL = 'https://ssczfiqgnronmxopvpyw.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzY3pmaXFnbnJvbm14b3B2cHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1OTA0MzMsImV4cCI6MjAzODE2NjQzM30.MXkj7nwXXClxYyyC9nP6-KCCHUrji3NRGev4Dff7lfo';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const form = document.getElementById('insertForm');

    const fetchData = async () => {
        try {
            const { data, error } = await supabaseClient
                .from('clothing')
                .select('*');
            
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                displayData(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

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

    const displayData = async (data) => {
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
                    await deleteClothingRecord(id);
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

    const deleteClothingRecord = async (id) => {
        try {
            // Fetch associated images
            const images = await fetchImages(id);

            // Delete images from storage
            const fileNames = images.map(img => img.fileName);
            if (fileNames.length > 0) {
                await removeFromStorage(fileNames);
            }

            // Delete image metadata from 'images' table
            const { error: deleteImagesError } = await supabaseClient
                .from('images')
                .delete()
                .eq('clothing_id', id);

            if (deleteImagesError) {
                console.error('Error deleting image metadata:', deleteImagesError);
            }

            // Delete record from 'clothing' table
            const { error: deleteClothingError } = await supabaseClient
                .from('clothing')
                .delete()
                .eq('id', id);

            if (deleteClothingError) {
                console.error('Error deleting clothing data:', deleteClothingError);
            } else {
                console.log('Clothing data deleted');
                fetchData(); // Refresh the grid
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const removeFromStorage = async (fileNames) => {
        try {
            const { error } = await supabaseClient.storage
                .from('uploads')
                .remove(fileNames);
            
            if (error) {
                console.error('Error deleting images from storage:', error);
            } else {
                console.log('Images deleted from storage');
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
                fetchData(); // Refresh the grid
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
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal .close');

    document.addEventListener('click', async (event) => {
        if (event.target.matches('.flex-table-cell.images img')) {
            const imageUrl = event.target.src;
            modalImage.src = imageUrl;
            modal.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('deleteBtn').addEventListener('click', async () => {
        const imageUrl = modalImage.src;
        const fileName = imageUrl.split('/').pop();
    
        if (!confirm('Are you sure you want to delete this image?')) return;
    
        try {
            await removeFromStorage([fileName]);
            await deleteRecord(fileName, 'images');
            alert('Image delete successful!');
            modal.style.display = 'none';
        } catch (error) {
            console.error(error.message);
            alert('Error deleting image. Please try again.');
        }
    });
});
