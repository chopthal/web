clear;
close all;

conc = 1e-6;
kon = 1e3; koff = 1e-6;
k = [kon, koff];
Rmax = 2000;

numSys = 3;
timeSpan = [0, 3000];
deltaT = 1;

steps = round((timeSpan(2) - timeSpan(1)) / deltaT);
tMat = zeros(steps+1, 1); tMat(1) = timeSpan(1);

res = zeros(steps+1, numSys); 
y0 = [conc, Rmax, 0]; 
res(1, :) = y0;

% % Euler's method
for i = 1:steps   
   t = tMat(i);       
   tgt = [res(i, 1); res(i, 2); res(i, 3)];   

   odeRes = f(t, tgt, k);
   res(i+1, :) = tgt + odeRes' * deltaT;

   tMat(i+1) = t + deltaT;
end

fig = figure(1); ax = axes(fig);
hold(ax, 'on'); plot(ax, tMat, res(:, 3)); hold(ax, 'off');

function dy = f(t, y, k)
    ka = k(1);
    kd = k(2);

    dy(1) = 0;
    dy(2) = -ka*y(1)*y(2) + kd*y(3);
    dy(3) =  ka*y(1)*y(2) - kd*y(3);
end

