// Form Options Configuration
export const formOptions = {
    cities: [
        { value: 'istanbul', label: 'İstanbul' },
        { value: 'ankara', label: 'Ankara' },
        { value: 'izmir', label: 'İzmir' },
        { value: 'bursa', label: 'Bursa' },
        { value: 'antalya', label: 'Antalya' }
    ],
    
    districts: {
        istanbul: [
            { value: 'pendik', label: 'Pendik' },
            { value: 'sultanbeyli', label: 'Sultanbeyli' },
            { value: 'tuzla', label: 'Tuzla' }
        ]
    },
    
    neighborhoods: {
        pendik: [
            { value: 'yayalar', label: 'Yayalar' },
            { value: 'şeyhli', label: 'Şeyhli' },
            { value: 'sanayi mahallesi', label: 'Sanayi Mahallesi' },
            { value: 'sülüntepe', label: 'Kurtköy' },
            { value: 'çamlık', label: 'Çamlık' },
            { value: 'fatih', label: 'Fatih' }
        ],
        sultanbeyli: [
            { value: 'necip fazıl', label: 'Necip Fazıl' },
            { value: 'akşemsettin', label: 'Akşemsettin' },
            { value: 'mecidiye', label: 'Mecidiye' },
            { value: 'hamidiye', label: 'Hamidiye' }
        ],
        tuzla: [
            { value: 'tepeören', label: 'Tepeören' }
        ],
    }
};

export const getDistrictsByCity = (cityValue) => {
    return formOptions.districts[cityValue] || [];
};

export const getNeighborhoodsByDistrict = (districtValue) => {
    return formOptions.neighborhoods[districtValue] || [];
};

export const getAllCities = () => {
    return formOptions.cities;
};
