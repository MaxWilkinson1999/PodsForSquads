document.addEventListener('DOMContentLoaded', () => {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const protanModeSwitch = document.getElementById('ProtanModeSwitch');
    const deuterModeSwitch = document.getElementById('deuterModeSwitch');

    
    const mode = localStorage.getItem('colorMode');
    if (mode) {
        document.body.classList.add(mode);
        if (mode === 'dark-mode') darkModeSwitch.checked = true;
        if (mode === 'protan-mode') protanModeSwitch.checked = true;
        if (mode === 'deuter-mode') deuterModeSwitch.checked = true;
    }

    function updateColorModes(selectedMode) {
        
        document.body.classList.remove('dark-mode', 'protan-mode', 'deuter-mode');

       
        if (selectedMode) {
            document.body.classList.add(selectedMode);
            localStorage.setItem('colorMode', selectedMode);
        } else {
            localStorage.removeItem('colorMode');
        }

        
        darkModeSwitch.checked = (selectedMode === 'dark-mode');
        protanModeSwitch.checked = (selectedMode === 'protan-mode');
        deuterModeSwitch.checked = (selectedMode === 'deuter-mode');
    }

  
    darkModeSwitch.addEventListener('change', () => {
        if (darkModeSwitch.checked) {
            updateColorModes('dark-mode');
        } else if (document.body.classList.contains('dark-mode')) {
            updateColorModes(null);
        }
    });

  
    protanModeSwitch.addEventListener('change', () => {
        if (protanModeSwitch.checked) {
            updateColorModes('protan-mode');
        } else if (document.body.classList.contains('protan-mode')) {
            updateColorModes(null);
        }
    });

  
    deuterModeSwitch.addEventListener('change', () => {
        if (deuterModeSwitch.checked) {
            updateColorModes('deuter-mode');
        } else if (document.body.classList.contains('deuter-mode')) {
            updateColorModes(null);
        }
    });
});
