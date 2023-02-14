import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import MotorService from '../../../src/Services/MotorService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import newMotor from './Mocks/MotorMock';

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

    Sinon.restore();
  });
});