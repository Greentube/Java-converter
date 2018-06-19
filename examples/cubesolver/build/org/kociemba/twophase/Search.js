var org_kociemba_twophase_Search = 
{
    $: function()
    {
    }
    ,
    ax: null,
    po: null,
    flip: null,
    twist: null,
    slice: null,
    parity: null,
    URFtoDLF: null,
    FRtoBR: null,
    URtoUL: null,
    UBtoDF: null,
    URtoDF: null,
    minDistPhase1: null,
    minDistPhase2: null,
    solutionToString_1: function($length)
    {
        var s = "";
        for (var i = 0; i < $length; i=(i +1)|0) 
        {
            switch (org_kociemba_twophase_Search.ax[i])
            {
                case 0:
                    s += ""+"U";
                    break;
                case 1:
                    s += ""+"R";
                    break;
                case 2:
                    s += ""+"F";
                    break;
                case 3:
                    s += ""+"D";
                    break;
                case 4:
                    s += ""+"L";
                    break;
                case 5:
                    s += ""+"B";
                    break;
            }
            switch (org_kociemba_twophase_Search.po[i])
            {
                case 1:
                    s += ""+" ";
                    break;
                case 2:
                    s += ""+"2 ";
                    break;
                case 3:
                    s += ""+"\' ";
                    break;
            }
        }
        return s;
    }
    ,
    solutionToString_2: function($length,depthPhase1)
    {
        var s = "";
        for (var i = 0; i < $length; i=(i +1)|0) 
        {
            switch (org_kociemba_twophase_Search.ax[i])
            {
                case 0:
                    s += ""+"U";
                    break;
                case 1:
                    s += ""+"R";
                    break;
                case 2:
                    s += ""+"F";
                    break;
                case 3:
                    s += ""+"D";
                    break;
                case 4:
                    s += ""+"L";
                    break;
                case 5:
                    s += ""+"B";
                    break;
            }
            switch (org_kociemba_twophase_Search.po[i])
            {
                case 1:
                    s += ""+" ";
                    break;
                case 2:
                    s += ""+"2 ";
                    break;
                case 3:
                    s += ""+"\' ";
                    break;
            }
            if (i === ((depthPhase1 - 1)|0)) s += ""+". ";
        }
        return s;
    }
    ,
    solution_4: function(facelets,maxDepth,timeOut,useSeparator)
    {
        var s = 0;
        var count = _dim("I",1,[6,],0);
        try
        {
            for (var i = 0; i < 54; i=(i +1)|0) count[org_kociemba_twophase_Color.valueOf_1(facelets.substring_2(i,((i + 1)|0))).ordinal_0()]=(count[org_kociemba_twophase_Color.valueOf_1(facelets.substring_2(i,((i + 1)|0))).ordinal_0()] +1)|0;
        }
        catch (e$)
        {
            var e = e$.throwable;
            if (e instanceof java_lang_IllegalArgumentException.$)
            {
                return "Error 1";
            }
            else { throw e$; }
        }
        for (var i = 0; i < 6; i=(i +1)|0) if (count[i] !== 9) return "Error 1";
        var fc = (new org_kociemba_twophase_FaceCube.$())._1(facelets);
        var cc = fc.toCubieCube_0();
        if ((s = cc.verify_0()) !== 0) return "Error "+""+java_lang_Math.absInt_1(s);
        var c = (new org_kociemba_twophase_CoordCube.$())._1(cc);
        org_kociemba_twophase_Search.po[0] = 0;
        org_kociemba_twophase_Search.ax[0] = 0;
        org_kociemba_twophase_Search.flip[0] = c.flip;
        org_kociemba_twophase_Search.twist[0] = c.twist;
        org_kociemba_twophase_Search.parity[0] = c.parity;
        org_kociemba_twophase_Search.slice[0] = _idiv(c.FRtoBR, 24);
        org_kociemba_twophase_Search.URFtoDLF[0] = c.URFtoDLF;
        org_kociemba_twophase_Search.FRtoBR[0] = c.FRtoBR;
        org_kociemba_twophase_Search.URtoUL[0] = c.URtoUL;
        org_kociemba_twophase_Search.UBtoDF[0] = c.UBtoDF;
        org_kociemba_twophase_Search.minDistPhase1[1] = 1;
        var mv = 0, n = 0;
        var busy = false;
        var depthPhase1 = 1;
        var tStart = java_lang_System.currentTimeMillisAsDouble_0();
        do 
        {
            do 
            {
                if ((((depthPhase1 - n)|0) > org_kociemba_twophase_Search.minDistPhase1[((n + 1)|0)]) &&  ! busy) 
                {
                    if (org_kociemba_twophase_Search.ax[n] === 0 || org_kociemba_twophase_Search.ax[n] === 3) org_kociemba_twophase_Search.ax[(n=(n +1)|0)] = 1;

                    else org_kociemba_twophase_Search.ax[(n=(n +1)|0)] = 0;
                    org_kociemba_twophase_Search.po[n] = 1;
                }
                else if ((org_kociemba_twophase_Search.po[n]=(org_kociemba_twophase_Search.po[n] +1)|0) > 3) 
                {
                    do 
                    {
                        if ((org_kociemba_twophase_Search.ax[n]=(org_kociemba_twophase_Search.ax[n] +1)|0) > 5) 
                        {
                            if ((java_lang_System.currentTimeMillisAsDouble_0()) - tStart > timeOut * 1000) return "Error 8";
                            if (n === 0) 
                            {
                                if (depthPhase1 >= maxDepth) return "Error 7";

                                else {
                                    depthPhase1=(depthPhase1 +1)|0;
                                    org_kociemba_twophase_Search.ax[n] = 0;
                                    org_kociemba_twophase_Search.po[n] = 1;
                                    busy = false;
                                    break;
                                }
                            }
                            else {
                                n=(n -1)|0;
                                busy = true;
                                break;
                            }
                        }
                        else {
                            org_kociemba_twophase_Search.po[n] = 1;
                            busy = false;
                        }
                    }
                    while (n !== 0 && (org_kociemba_twophase_Search.ax[((n - 1)|0)] === org_kociemba_twophase_Search.ax[n] || ((org_kociemba_twophase_Search.ax[((n - 1)|0)] - 3)|0) === org_kociemba_twophase_Search.ax[n]));
                }
                else busy = false;
            }
            while (busy);
            mv = ((((((3 * org_kociemba_twophase_Search.ax[n])|0) + org_kociemba_twophase_Search.po[n])|0) - 1)|0);
            org_kociemba_twophase_Search.flip[((n + 1)|0)] = org_kociemba_twophase_CoordCube.flipMove[org_kociemba_twophase_Search.flip[n]][mv];
            org_kociemba_twophase_Search.twist[((n + 1)|0)] = org_kociemba_twophase_CoordCube.twistMove[org_kociemba_twophase_Search.twist[n]][mv];
            org_kociemba_twophase_Search.slice[((n + 1)|0)] = _idiv(org_kociemba_twophase_CoordCube.FRtoBR__Move[((org_kociemba_twophase_Search.slice[n] * 24)|0)][mv], 24);
            org_kociemba_twophase_Search.minDistPhase1[((n + 1)|0)] = java_lang_Math.max_2(org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,((_imul(495, org_kociemba_twophase_Search.flip[((n + 1)|0)]) + org_kociemba_twophase_Search.slice[((n + 1)|0)])|0)),org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,((_imul(495, org_kociemba_twophase_Search.twist[((n + 1)|0)]) + org_kociemba_twophase_Search.slice[((n + 1)|0)])|0)));
            if (org_kociemba_twophase_Search.minDistPhase1[((n + 1)|0)] === 0 && n >= ((depthPhase1 - 5)|0)) 
            {
                org_kociemba_twophase_Search.minDistPhase1[((n + 1)|0)] = 10;
                if (n === ((depthPhase1 - 1)|0) && (s = org_kociemba_twophase_Search.totalDepth_2(depthPhase1,maxDepth)) >= 0) 
                {
                    if (s === depthPhase1 || (org_kociemba_twophase_Search.ax[((depthPhase1 - 1)|0)] !== org_kociemba_twophase_Search.ax[depthPhase1] && org_kociemba_twophase_Search.ax[((depthPhase1 - 1)|0)] !== ((org_kociemba_twophase_Search.ax[depthPhase1] + 3)|0))) return useSeparator?org_kociemba_twophase_Search.solutionToString_2(s,depthPhase1):org_kociemba_twophase_Search.solutionToString_1(s);
                }
            }
        }
        while (true);
    }
    ,
    totalDepth_2: function(depthPhase1,maxDepth)
    {
        var mv = 0, d1 = 0, d2 = 0;
        var maxDepthPhase2 = java_lang_Math.min_2(10,((maxDepth - depthPhase1)|0));
        for (var i = 0; i < depthPhase1; i=(i +1)|0) 
        {
            mv = ((((((3 * org_kociemba_twophase_Search.ax[i])|0) + org_kociemba_twophase_Search.po[i])|0) - 1)|0);
            org_kociemba_twophase_Search.URFtoDLF[((i + 1)|0)] = org_kociemba_twophase_CoordCube.URFtoDLF__Move[org_kociemba_twophase_Search.URFtoDLF[i]][mv];
            org_kociemba_twophase_Search.FRtoBR[((i + 1)|0)] = org_kociemba_twophase_CoordCube.FRtoBR__Move[org_kociemba_twophase_Search.FRtoBR[i]][mv];
            org_kociemba_twophase_Search.parity[((i + 1)|0)] = org_kociemba_twophase_CoordCube.parityMove[org_kociemba_twophase_Search.parity[i]][mv];
        }
        if ((d1 = org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,(((((((_imul(24, org_kociemba_twophase_Search.URFtoDLF[depthPhase1]) + org_kociemba_twophase_Search.FRtoBR[depthPhase1])|0)) * 2)|0) + org_kociemba_twophase_Search.parity[depthPhase1])|0))) > maxDepthPhase2) return -1;
        for (var i = 0; i < depthPhase1; i=(i +1)|0) 
        {
            mv = ((((((3 * org_kociemba_twophase_Search.ax[i])|0) + org_kociemba_twophase_Search.po[i])|0) - 1)|0);
            org_kociemba_twophase_Search.URtoUL[((i + 1)|0)] = org_kociemba_twophase_CoordCube.URtoUL__Move[org_kociemba_twophase_Search.URtoUL[i]][mv];
            org_kociemba_twophase_Search.UBtoDF[((i + 1)|0)] = org_kociemba_twophase_CoordCube.UBtoDF__Move[org_kociemba_twophase_Search.UBtoDF[i]][mv];
        }
        org_kociemba_twophase_Search.URtoDF[depthPhase1] = org_kociemba_twophase_CoordCube.MergeURtoULandUBtoDF[org_kociemba_twophase_Search.URtoUL[depthPhase1]][org_kociemba_twophase_Search.UBtoDF[depthPhase1]];
        if ((d2 = org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,(((((((_imul(24, org_kociemba_twophase_Search.URtoDF[depthPhase1]) + org_kociemba_twophase_Search.FRtoBR[depthPhase1])|0)) * 2)|0) + org_kociemba_twophase_Search.parity[depthPhase1])|0))) > maxDepthPhase2) return -1;
        if ((org_kociemba_twophase_Search.minDistPhase2[depthPhase1] = java_lang_Math.max_2(d1,d2)) === 0) return depthPhase1;
        var depthPhase2 = 1;
        var n = depthPhase1;
        var busy = false;
        org_kociemba_twophase_Search.po[depthPhase1] = 0;
        org_kociemba_twophase_Search.ax[depthPhase1] = 0;
        org_kociemba_twophase_Search.minDistPhase2[((n + 1)|0)] = 1;
        do 
        {
            do 
            {
                if ((((((depthPhase1 + depthPhase2)|0) - n)|0) > org_kociemba_twophase_Search.minDistPhase2[((n + 1)|0)]) &&  ! busy) 
                {
                    if (org_kociemba_twophase_Search.ax[n] === 0 || org_kociemba_twophase_Search.ax[n] === 3) 
                    {
                        org_kociemba_twophase_Search.ax[(n=(n +1)|0)] = 1;
                        org_kociemba_twophase_Search.po[n] = 2;
                    }
                    else {
                        org_kociemba_twophase_Search.ax[(n=(n +1)|0)] = 0;
                        org_kociemba_twophase_Search.po[n] = 1;
                    }
                }
                else if ((org_kociemba_twophase_Search.ax[n] === 0 || org_kociemba_twophase_Search.ax[n] === 3)?((org_kociemba_twophase_Search.po[n]=(org_kociemba_twophase_Search.po[n] +1)|0) > 3):((org_kociemba_twophase_Search.po[n] = ((org_kociemba_twophase_Search.po[n] + 2)|0)) > 3)) 
                {
                    do 
                    {
                        if ((org_kociemba_twophase_Search.ax[n]=(org_kociemba_twophase_Search.ax[n] +1)|0) > 5) 
                        {
                            if (n === depthPhase1) 
                            {
                                if (depthPhase2 >= maxDepthPhase2) return -1;

                                else {
                                    depthPhase2=(depthPhase2 +1)|0;
                                    org_kociemba_twophase_Search.ax[n] = 0;
                                    org_kociemba_twophase_Search.po[n] = 1;
                                    busy = false;
                                    break;
                                }
                            }
                            else {
                                n=(n -1)|0;
                                busy = true;
                                break;
                            }
                        }
                        else {
                            if (org_kociemba_twophase_Search.ax[n] === 0 || org_kociemba_twophase_Search.ax[n] === 3) org_kociemba_twophase_Search.po[n] = 1;

                            else org_kociemba_twophase_Search.po[n] = 2;
                            busy = false;
                        }
                    }
                    while (n !== depthPhase1 && (org_kociemba_twophase_Search.ax[((n - 1)|0)] === org_kociemba_twophase_Search.ax[n] || ((org_kociemba_twophase_Search.ax[((n - 1)|0)] - 3)|0) === org_kociemba_twophase_Search.ax[n]));
                }
                else busy = false;
            }
            while (busy);
            mv = ((((((3 * org_kociemba_twophase_Search.ax[n])|0) + org_kociemba_twophase_Search.po[n])|0) - 1)|0);
            org_kociemba_twophase_Search.URFtoDLF[((n + 1)|0)] = org_kociemba_twophase_CoordCube.URFtoDLF__Move[org_kociemba_twophase_Search.URFtoDLF[n]][mv];
            org_kociemba_twophase_Search.FRtoBR[((n + 1)|0)] = org_kociemba_twophase_CoordCube.FRtoBR__Move[org_kociemba_twophase_Search.FRtoBR[n]][mv];
            org_kociemba_twophase_Search.parity[((n + 1)|0)] = org_kociemba_twophase_CoordCube.parityMove[org_kociemba_twophase_Search.parity[n]][mv];
            org_kociemba_twophase_Search.URtoDF[((n + 1)|0)] = org_kociemba_twophase_CoordCube.URtoDF__Move[org_kociemba_twophase_Search.URtoDF[n]][mv];
            org_kociemba_twophase_Search.minDistPhase2[((n + 1)|0)] = java_lang_Math.max_2(org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,(((((((_imul(24, org_kociemba_twophase_Search.URtoDF[((n + 1)|0)]) + org_kociemba_twophase_Search.FRtoBR[((n + 1)|0)])|0)) * 2)|0) + org_kociemba_twophase_Search.parity[((n + 1)|0)])|0)),org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,(((((((_imul(24, org_kociemba_twophase_Search.URFtoDLF[((n + 1)|0)]) + org_kociemba_twophase_Search.FRtoBR[((n + 1)|0)])|0)) * 2)|0) + org_kociemba_twophase_Search.parity[((n + 1)|0)])|0)));
        }
        while (org_kociemba_twophase_Search.minDistPhase2[((n + 1)|0)] !== 0);
        return ((depthPhase1 + depthPhase2)|0);
    }
    ,
};
_class(org_kociemba_twophase_Search, java_lang_Object, null,
"org.kociemba.twophase.Search" //replace-me-with-empty-string-for-production//
,{
});
org_kociemba_twophase_Search.ax = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.po = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.flip = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.twist = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.slice = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.parity = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.URFtoDLF = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.FRtoBR = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.URtoUL = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.UBtoDF = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.URtoDF = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.minDistPhase1 = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.minDistPhase2 = _dim("I",1,[31,],0);
//reference// java/lang/Math
//reference// org/kociemba/twophase/Color
//reference// org/kociemba/twophase/CoordCube
//reference// java/lang/IllegalArgumentException
//reference// org/kociemba/twophase/FaceCube
//reference// org/kociemba/twophase/Search
//reference// java/lang/System
//load// java/lang/Object
