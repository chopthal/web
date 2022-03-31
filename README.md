# 1:1 binding kinetics Simulator (Langmuir isotherm)
## Algorithm
### Rate Equation
#### d[LA]/dt = kon * [L] * [A] - koff * [LA]

### ODE solver
- Euler's methods
- Runge-Kutta methods (under devleloping)

## Parameter
### Constant
- kon : association constant
- koff : dissociation constant
- Rmax : maximum binding signal at 100% activation of the ligand
- Conc : concentration of analyte solution


## Reference
1. https://www.sprpages.nl/
2. https://www.icluebio.com/aboutspr
3. Edwards, Paul R., et al. "Kinetics of protein-protein interactions at the surface of an optical biosensor." Analytical biochemistry 231.1 (1995): 210-217.
