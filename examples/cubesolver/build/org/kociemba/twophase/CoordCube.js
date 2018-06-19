var org_kociemba_twophase_CoordCube = 
{
    $: function()
    {
        this.twist = 0;
        this.flip = 0;
        this.parity = 0;
        this.FRtoBR = 0;
        this.URFtoDLF = 0;
        this.URtoUL = 0;
        this.UBtoDF = 0;
        this.URtoDF = 0;
    }
    ,
    N__TWIST: 2187,
    N__FLIP: 2048,
    N__SLICE1: 495,
    N__SLICE2: 24,
    N__PARITY: 2,
    N__URFtoDLF: 20160,
    N__FRtoBR: 11880,
    N__URtoUL: 1320,
    N__UBtoDF: 1320,
    N__URtoDF: 20160,
    N__URFtoDLB: 40320,
    N__URtoBR: 479001600,
    N__MOVE: 18,
    twistMove: null,
    flipMove: null,
    parityMove: null,
    FRtoBR__Move: null,
    URFtoDLF__Move: null,
    URtoDF__Move: null,
    URtoUL__Move: null,
    UBtoDF__Move: null,
    MergeURtoULandUBtoDF: null,
    Slice__URFtoDLF__Parity__Prun: null,
    Slice__URtoDF__Parity__Prun: null,
    Slice__Twist__Prun: null,
    Slice__Flip__Prun: null,
    setPruning_3: function(table,index,value)
    {
        if ((index & 1) === 0) table[_idiv(index, 2)] = _castTObyte((table[_idiv(index, 2)])&(240 | value));

        else table[_idiv(index, 2)] = _castTObyte((table[_idiv(index, 2)])&(15 | (value << 4)));
    }
    ,
    getPruning_2: function(table,index)
    {
        if ((index & 1) === 0) return _castTObyte((table[_idiv(index, 2)] & 15));

        else return _castTObyte(((table[_idiv(index, 2)] & 240) >>> 4));
    }
    ,
};
_class(org_kociemba_twophase_CoordCube, java_lang_Object, null,
"org.kociemba.twophase.CoordCube" //replace-me-with-empty-string-for-production//
,{
    _1: function(c)
    {
        this.twist = c.getTwist_0();
        this.flip = c.getFlip_0();
        this.parity = c.cornerParity_0();
        this.FRtoBR = c.getFRtoBR_0();
        this.URFtoDLF = c.getURFtoDLF_0();
        this.URtoUL = c.getURtoUL_0();
        this.UBtoDF = c.getUBtoDF_0();
        this.URtoDF = c.getURtoDF_0();
        return this;
    }
    ,
    move_1: function(m)
    {
        this.twist = org_kociemba_twophase_CoordCube.twistMove[this.twist][m];
        this.flip = org_kociemba_twophase_CoordCube.flipMove[this.flip][m];
        this.parity = org_kociemba_twophase_CoordCube.parityMove[this.parity][m];
        this.FRtoBR = org_kociemba_twophase_CoordCube.FRtoBR__Move[this.FRtoBR][m];
        this.URFtoDLF = org_kociemba_twophase_CoordCube.URFtoDLF__Move[this.URFtoDLF][m];
        this.URtoUL = org_kociemba_twophase_CoordCube.URtoUL__Move[this.URtoUL][m];
        this.UBtoDF = org_kociemba_twophase_CoordCube.UBtoDF__Move[this.UBtoDF][m];
        if (this.URtoUL < 336 && this.UBtoDF < 336) this.URtoDF = org_kociemba_twophase_CoordCube.MergeURtoULandUBtoDF[this.URtoUL][this.UBtoDF];
    }
    ,
});
org_kociemba_twophase_CoordCube.twistMove = _dim("S",2,[org_kociemba_twophase_CoordCube.N__TWIST,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 2187; i=(i +1)<<16>>16) 
    {
        a.setTwist_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.cornerMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.twistMove[i][((((3 * j)|0) + k)|0)] = a.getTwist_0();
            }
            a.cornerMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.flipMove = _dim("S",2,[org_kociemba_twophase_CoordCube.N__FLIP,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 2048; i=(i +1)<<16>>16) 
    {
        a.setFlip_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.flipMove[i][((((3 * j)|0) + k)|0)] = a.getFlip_0();
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.parityMove = _arr("S",2,[_arr("S",1,[1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1]),_arr("S",1,[0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0])]);
org_kociemba_twophase_CoordCube.FRtoBR__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__FRtoBR,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 11880; i=(i +1)<<16>>16) 
    {
        a.setFRtoBR_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.FRtoBR__Move[i][((((3 * j)|0) + k)|0)] = a.getFRtoBR_0();
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.URFtoDLF__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__URFtoDLF,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 20160; i=(i +1)<<16>>16) 
    {
        a.setURFtoDLF_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.cornerMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.URFtoDLF__Move[i][((((3 * j)|0) + k)|0)] = a.getURFtoDLF_0();
            }
            a.cornerMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.URtoDF__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__URtoDF,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 20160; i=(i +1)<<16>>16) 
    {
        a.setURtoDF_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.URtoDF__Move[i][((((3 * j)|0) + k)|0)] = _castTOshort(a.getURtoDF_0());
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.URtoUL__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__URtoUL,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 1320; i=(i +1)<<16>>16) 
    {
        a.setURtoUL_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.URtoUL__Move[i][((((3 * j)|0) + k)|0)] = a.getURtoUL_0();
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.UBtoDF__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__UBtoDF,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 1320; i=(i +1)<<16>>16) 
    {
        a.setUBtoDF_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.UBtoDF__Move[i][((((3 * j)|0) + k)|0)] = a.getUBtoDF_0();
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.MergeURtoULandUBtoDF = _dim("S",2,[336,336,],0);
{
    for (var uRtoUL = 0; uRtoUL < 336; uRtoUL=(uRtoUL +1)<<16>>16) 
    {
        for (var uBtoDF = 0; uBtoDF < 336; uBtoDF=(uBtoDF +1)<<16>>16) 
        {
            org_kociemba_twophase_CoordCube.MergeURtoULandUBtoDF[uRtoUL][uBtoDF] = _castTOshort(org_kociemba_twophase_CubieCube.getURtoDF_2(uRtoUL,uBtoDF));
        }
    }
}
org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun = _dim("B",1,[_idiv(967680, 2),],0);
{
    for (var i = 0; i < 483840; i=(i +1)|0) org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun[i] = -1;
    var depth = 0;
    org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,0,0);
    var done = 1;
    while (done !== 967680) 
    {
        for (var i = 0; i < 967680; i=(i +1)|0) 
        {
            var parity = i % 2;
            var URFtoDLF = _idiv((_idiv(i, 2)), 24);
            var slice = (_idiv(i, 2)) % 24;
            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,i) === depth) 
            {
                for (var j = 0; j < 18; j=(j +1)|0) 
                {
                    switch (j)
                    {
                        case 3:
                        case 5:
                        case 6:
                        case 8:
                        case 12:
                        case 14:
                        case 15:
                        case 17:
                            continue;
                        default:
                            var newSlice = org_kociemba_twophase_CoordCube.FRtoBR__Move[slice][j];
                            var newURFtoDLF = org_kociemba_twophase_CoordCube.URFtoDLF__Move[URFtoDLF][j];
                            var newParity = org_kociemba_twophase_CoordCube.parityMove[parity][j];
                            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,(((((((_imul(24, newURFtoDLF) + newSlice)|0)) * 2)|0) + newParity)|0)) === 15) 
                            {
                                org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,(((((((_imul(24, newURFtoDLF) + newSlice)|0)) * 2)|0) + newParity)|0),_castTObyte((((depth + 1)|0))));
                                done=(done +1)|0;
                            }
                    }
                }
            }
        }
        depth=(depth +1)|0;
    }
}
org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun = _dim("B",1,[_idiv(967680, 2),],0);
{
    for (var i = 0; i < 483840; i=(i +1)|0) org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun[i] = -1;
    var depth = 0;
    org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,0,0);
    var done = 1;
    while (done !== 967680) 
    {
        for (var i = 0; i < 967680; i=(i +1)|0) 
        {
            var parity = i % 2;
            var URtoDF = _idiv((_idiv(i, 2)), 24);
            var slice = (_idiv(i, 2)) % 24;
            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,i) === depth) 
            {
                for (var j = 0; j < 18; j=(j +1)|0) 
                {
                    switch (j)
                    {
                        case 3:
                        case 5:
                        case 6:
                        case 8:
                        case 12:
                        case 14:
                        case 15:
                        case 17:
                            continue;
                        default:
                            var newSlice = org_kociemba_twophase_CoordCube.FRtoBR__Move[slice][j];
                            var newURtoDF = org_kociemba_twophase_CoordCube.URtoDF__Move[URtoDF][j];
                            var newParity = org_kociemba_twophase_CoordCube.parityMove[parity][j];
                            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,(((((((_imul(24, newURtoDF) + newSlice)|0)) * 2)|0) + newParity)|0)) === 15) 
                            {
                                org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,(((((((_imul(24, newURtoDF) + newSlice)|0)) * 2)|0) + newParity)|0),_castTObyte((((depth + 1)|0))));
                                done=(done +1)|0;
                            }
                    }
                }
            }
        }
        depth=(depth +1)|0;
    }
}
org_kociemba_twophase_CoordCube.Slice__Twist__Prun = _dim("B",1,[((541282 + 1)|0),],0);
{
    for (var i = 0; i < 541283; i=(i +1)|0) org_kociemba_twophase_CoordCube.Slice__Twist__Prun[i] = -1;
    var depth = 0;
    org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,0,0);
    var done = 1;
    while (done !== 1082565) 
    {
        for (var i = 0; i < 1082565; i=(i +1)|0) 
        {
            var twist = _idiv(i, 495), slice = i % 495;
            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,i) === depth) 
            {
                for (var j = 0; j < 18; j=(j +1)|0) 
                {
                    var newSlice = _idiv(org_kociemba_twophase_CoordCube.FRtoBR__Move[((slice * 24)|0)][j], 24);
                    var newTwist = org_kociemba_twophase_CoordCube.twistMove[twist][j];
                    if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,((_imul(495, newTwist) + newSlice)|0)) === 15) 
                    {
                        org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,((_imul(495, newTwist) + newSlice)|0),_castTObyte((((depth + 1)|0))));
                        done=(done +1)|0;
                    }
                }
            }
        }
        depth=(depth +1)|0;
    }
}
org_kociemba_twophase_CoordCube.Slice__Flip__Prun = _dim("B",1,[_idiv(1013760, 2),],0);
{
    for (var i = 0; i < 506880; i=(i +1)|0) org_kociemba_twophase_CoordCube.Slice__Flip__Prun[i] = -1;
    var depth = 0;
    org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,0,0);
    var done = 1;
    while (done !== 1013760) 
    {
        for (var i = 0; i < 1013760; i=(i +1)|0) 
        {
            var flip = _idiv(i, 495), slice = i % 495;
            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,i) === depth) 
            {
                for (var j = 0; j < 18; j=(j +1)|0) 
                {
                    var newSlice = _idiv(org_kociemba_twophase_CoordCube.FRtoBR__Move[((slice * 24)|0)][j], 24);
                    var newFlip = org_kociemba_twophase_CoordCube.flipMove[flip][j];
                    if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,((_imul(495, newFlip) + newSlice)|0)) === 15) 
                    {
                        org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,((_imul(495, newFlip) + newSlice)|0),_castTObyte((((depth + 1)|0))));
                        done=(done +1)|0;
                    }
                }
            }
        }
        depth=(depth +1)|0;
    }
}
//load// java/lang/Object
//complete// org/kociemba/twophase/CoordCube
//complete// org/kociemba/twophase/CubieCube
