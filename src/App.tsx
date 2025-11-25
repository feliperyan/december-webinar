import { useState, useEffect } from 'react'
import './App.css'

type Pet = {
  id: string
  name: string
  species: string
  primaryBreed: string
  secondaryBreed: string | null
  ageInMonths: number
  gender: string
  size: string
  color: string
  appearance: string
  description: string
  vaccinated: boolean
  temperament: string[]
  adoptionFee: number
  dateArrived: string
  adoptionStatus: string
  location: string
  image: string
}

type Screen = 'list' | 'detail' | 'confirmation'

function App() {
  const [pets, setPets] = useState<Pet[]>([])
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [currentScreen, setCurrentScreen] = useState<Screen>('list')
  const [adoptedPetName, setAdoptedPetName] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      const response = await fetch('/api/pets')
      const data = await response.json()
      setPets(data)
    } catch (error) {
      console.error('Error fetching pets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInfoClick = async (petId: string) => {
    try {
      const response = await fetch(`/api/pets/${petId}`)
      const data = await response.json()
      setSelectedPet(data)
      setCurrentScreen('detail')
    } catch (error) {
      console.error('Error fetching pet details:', error)
    }
  }

  const handleAdopt = async () => {
    if (!selectedPet) return
    
    try {
      await fetch(`/api/pets/${selectedPet.id}/apply`, {
        method: 'POST'
      })
      setAdoptedPetName(selectedPet.name)
      setCurrentScreen('confirmation')
    } catch (error) {
      console.error('Error adopting pet:', error)
    }
  }

  const handleBack = () => {
    if (currentScreen === 'detail') {
      setCurrentScreen('list')
      setSelectedPet(null)
    } else if (currentScreen === 'confirmation') {
      setCurrentScreen('list')
      setSelectedPet(null)
      fetchPets() // Refresh the list
    }
  }

  return (
    <div className="app-container">
      {/* Pet List Screen */}
      {currentScreen === 'list' && (
        <div className="screen">
          <div className="top-bar">
            <span>Available Pets</span>
          </div>
          <div className="content scrollable">
            {loading ? (
              <p>Loading pets...</p>
            ) : (
              <div className="pet-list-grid">
                {pets.map((pet) => (
                  <div key={pet.id} className="pet-card">
                    <div className="pet-info">
                      <span>{pet.name}</span>
                      <span>{pet.species}</span>
                      <span>{pet.primaryBreed}</span>
                    </div>
                    <button
                      className="info-button"
                      onClick={() => handleInfoClick(pet.id)}
                    >
                      Info
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="footer">Pet Adoption Center</div>
        </div>
      )}

      {/* Pet Detail Screen */}
      {currentScreen === 'detail' && selectedPet && (
        <div className="screen">
          <div className="top-bar">
            <button className="back-button" onClick={handleBack}>
              ◀ Back
            </button>
            <span>{selectedPet.name}</span>
          </div>
          <div className="content">
            <div className="detail-layout">
              <div className="detail-left">
                <div className="image-container">
                  <img src={selectedPet.image} alt={selectedPet.name} />
                </div>
                <button className="adopt-button" onClick={handleAdopt}>
                  Adopt {selectedPet.name}
                </button>
              </div>
              <div className="detail-right">
                <div className="details-container scrollable">
                  <p><strong>Name:</strong> {selectedPet.name}</p>
                  <p><strong>Species:</strong> {selectedPet.species}</p>
                  <p><strong>Primary Breed:</strong> {selectedPet.primaryBreed}</p>
                  {selectedPet.secondaryBreed && (
                    <p><strong>Secondary Breed:</strong> {selectedPet.secondaryBreed}</p>
                  )}
                  <p><strong>Age:</strong> {selectedPet.ageInMonths} months</p>
                  <p><strong>Gender:</strong> {selectedPet.gender}</p>
                  <p><strong>Size:</strong> {selectedPet.size}</p>
                  <p><strong>Color:</strong> {selectedPet.color}</p>
                  <p><strong>Appearance:</strong> {selectedPet.appearance}</p>
                  <p><strong>Description:</strong> {selectedPet.description}</p>
                  <p><strong>Vaccinated:</strong> {selectedPet.vaccinated ? 'Yes' : 'No'}</p>
                  <p><strong>Temperament:</strong> {selectedPet.temperament.join(', ')}</p>
                  <p><strong>Adoption Fee:</strong> ${selectedPet.adoptionFee}</p>
                  <p><strong>Date Arrived:</strong> {selectedPet.dateArrived}</p>
                  <p><strong>Status:</strong> {selectedPet.adoptionStatus}</p>
                  <p><strong>Location:</strong> {selectedPet.location}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">Pet Adoption Center</div>
        </div>
      )}

      {/* Confirmation Screen */}
      {currentScreen === 'confirmation' && (
        <div className="screen">
          <div className="top-bar">
            <button className="back-button" onClick={handleBack}>
              ◀ Back
            </button>
            <span>Adoption Complete</span>
          </div>
          <div className="content centered">
            <h2>🎉 Congratulations on adopting {adoptedPetName}! 🎉</h2>
            <p>Thank you for giving {adoptedPetName} a loving home!</p>
          </div>
          <div className="footer">Pet Adoption Center</div>
        </div>
      )}
    </div>
  )
}

export default App