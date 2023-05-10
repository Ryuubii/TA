import { passwordStrength } from 'check-password-strength';
// import jwtService from './src/service/authentication/jwtService.js';
// import passwordService from './src/service/authentication/passwordService.js';
// const hash = await passwordService.hashPassword('hello');
// console.log(hash);
// console.log(await passwordService.validatePassword('hello', hash));
// console.log(await passwordService.validatePassword('hello', '$2b$10$ac/.Dy5KnGduGrspcrrDXOQzcsz5tTt7Uqbu76Lrfcv3QSud7YqmC'));
// console.log(await passwordService.validatePassword('wrong', hash));

// const payload = {
//     data1: 'Data 1',
//     data2: 'Data 2',
//     data3: 'Data 3',
//     data4: 'Data 4',
// };

// const token = jwtService.createToken(payload);
// console.log(token);
// console.log(jwtService.verifyToken(token));

console.log(passwordStrength('asdfasdf').value);
console.log(passwordStrength('asdf1234').value);
console.log(passwordStrength('Asd1234!').value);
console.log(passwordStrength('A@2asdF2020!!*').value);
