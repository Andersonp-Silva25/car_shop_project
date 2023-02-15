import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import MotorService from '../../../src/Services/MotorService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import { deleteMotor, listMotor, newMotor, updatedMotor } from './Mocks/MotorMock';

describe('Testando as funcionalidade de MotorService', function () {
  it('Deve cadastrar uma nova moto', async function () {
    // Arrange
    const response: Motorcycle = new Motorcycle(
      { id: '634852326b35b59438fbea2f', ...newMotor },
    );

    Sinon.stub(Model, 'create').resolves(response);

    // Action
    const service = new MotorService();
    const result = await service.create(newMotor);

    // Assert
    expect(result).to.be.deep.equal(response);
  });

  it('Deve listar todas as motos', async function () {
    // Arrange
    Sinon.stub(Model, 'find').resolves(listMotor);

    // Action
    const service = new MotorService();
    const result = await service.find();

    // Assert
    expect(result).to.be.deep.equal(listMotor);
  });

  it('Deve buscar uma moto pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(listMotor[0]);

    // Action
    const service = new MotorService();
    const result = await service.findById('634852326b35b59438fbea2f');
        
    // Assert
    expect(result).to.be.deep.equal(listMotor[0]);
  });

  it('Não devera buscar motos se o mongoId for invalido', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(listMotor[0]);

    try {
    // Action
      const service = new MotorService();
      await service.findById('63');
    } catch (error) {    
    // Assert
      expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Não devera buscar motos que não existam', async function () {
    // Arrange
    Sinon.stub(Model, 'findById').resolves(listMotor[0]);

    try {
    // Action
      const service = new MotorService();
      await service.findById('634852326b35b59438fbea56');
    } catch (error) {    
    // Assert
      expect((error as Error).message).to.be.deep.equal('Motorcycle not found');
    }
  });

  it('Deve atualizar uma moto pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedMotor);

    // Action
    const service = new MotorService();
    const result = await service.update('634852326b35b59438fbea2f', newMotor);
        
    // Assert
    expect(result).to.be.deep.equal(updatedMotor);
  });

  it('Deve excluir uma moto pelo seu id', async function () {
    // Arrange
    Sinon.stub(Model, 'findByIdAndDelete').resolves(deleteMotor);
    Sinon.stub(Model, 'find').resolves(deleteMotor);

    // Action
    const service = new MotorService();
    await service.delete('634852326b35b59438fbea2f');
    const result = await service.find();
        
    // Assert
    expect(result).to.be.deep.equal(deleteMotor);
  });

  afterEach(function () {
    Sinon.restore();
  });
});