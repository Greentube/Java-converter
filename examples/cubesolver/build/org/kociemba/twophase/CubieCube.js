var org_kociemba_twophase_CubieCube = 
{
    $: function()
    {
        this.cp = null;
        this.co = null;
        this.ep = null;
        this.eo = null;
    }
    ,
    cpU: null,
    coU: null,
    epU: null,
    eoU: null,
    cpR: null,
    coR: null,
    epR: null,
    eoR: null,
    cpF: null,
    coF: null,
    epF: null,
    eoF: null,
    cpD: null,
    coD: null,
    epD: null,
    eoD: null,
    cpL: null,
    coL: null,
    epL: null,
    eoL: null,
    cpB: null,
    coB: null,
    epB: null,
    eoB: null,
    moveCube: null,
    Cnk_2: function(n,k)
    {
        var i = 0, j = 0, s = 0;
        if (n < k) return 0;
        if (k > _idiv(n, 2)) k = ((n - k)|0);
        for (s = 1,i = n,j = 1; i !== ((n - k)|0); i=(i -1)|0,j=(j +1)|0) 
        {
            s = _imul(s , i);
            s = _idiv(s , j);
        }
        return s;
    }
    ,
    rotateLeftC_3: function(arr,l,r)
    {
        var temp = arr[l];
        for (var i = l; i < r; i=(i +1)|0) arr[i] = arr[((i + 1)|0)];
        arr[r] = temp;
    }
    ,
    rotateRightC_3: function(arr,l,r)
    {
        var temp = arr[r];
        for (var i = r; i > l; i=(i -1)|0) arr[i] = arr[((i - 1)|0)];
        arr[l] = temp;
    }
    ,
    rotateLeftE_3: function(arr,l,r)
    {
        var temp = arr[l];
        for (var i = l; i < r; i=(i +1)|0) arr[i] = arr[((i + 1)|0)];
        arr[r] = temp;
    }
    ,
    rotateRightE_3: function(arr,l,r)
    {
        var temp = arr[r];
        for (var i = r; i > l; i=(i -1)|0) arr[i] = arr[((i - 1)|0)];
        arr[l] = temp;
    }
    ,
    getURtoDF_2: function(idx1,idx2)
    {
        var a = (new org_kociemba_twophase_CubieCube.$())._0();
        var b = (new org_kociemba_twophase_CubieCube.$())._0();
        a.setURtoUL_1(idx1);
        b.setUBtoDF_1(idx2);
        for (var i = 0; i < 8; i=(i +1)|0) 
        {
            if (a.ep[i] !== org_kociemba_twophase_Edge.BR) if (b.ep[i] !== org_kociemba_twophase_Edge.BR) return -1;

            else b.ep[i] = a.ep[i];
        }
        return b.getURtoDF_0();
    }
    ,
};
_class(org_kociemba_twophase_CubieCube, java_lang_Object, null,
"org.kociemba.twophase.CubieCube" //replace-me-with-empty-string-for-production//
,{
    _0: function()
    {
        this.cp = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
        this.co = _arr("B",1,[0,0,0,0,0,0,0,0]);
        this.ep = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
        this.eo = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
        {
        }
        return this;
    }
    ,
    _4: function(cp,co,ep,eo)
    {
        org_kociemba_twophase_CubieCube.$.prototype._0.call(this);
        for (var i = 0; i < 8; i=(i +1)|0) 
        {
            this.cp[i] = cp[i];
            this.co[i] = co[i];
        }
        for (var i = 0; i < 12; i=(i +1)|0) 
        {
            this.ep[i] = ep[i];
            this.eo[i] = eo[i];
        }
        return this;
    }
    ,
    toFaceCube_0: function()
    {
        var fcRet = (new org_kociemba_twophase_FaceCube.$())._0();
        for (var c, c_i=0, c_a=org_kociemba_twophase_Corner.values_0(); (c_i<c_a.length)&&((c=c_a[c_i])||true); c_i++)
        {
            var i = c.ordinal_0();
            var j = this.cp[i].ordinal_0();
            var ori = this.co[i];
            for (var n = 0; n < 3; n=(n +1)|0) fcRet.f[org_kociemba_twophase_FaceCube.cornerFacelet[i][(((n + ori)|0)) % 3].ordinal_0()] = org_kociemba_twophase_FaceCube.cornerColor[j][n];
        }

        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)
        {
            var i = e.ordinal_0();
            var j = this.ep[i].ordinal_0();
            var ori = this.eo[i];
            for (var n = 0; n < 2; n=(n +1)|0) fcRet.f[org_kociemba_twophase_FaceCube.edgeFacelet[i][(((n + ori)|0)) % 2].ordinal_0()] = org_kociemba_twophase_FaceCube.edgeColor[j][n];
        }

        return fcRet;
    }
    ,
    cornerMultiply_1: function(b)
    {
        var cPerm = _dim(org_kociemba_twophase_Corner,1,[8,],null);
        var cOri = _dim("B",1,[8,],0);
        for (var corn, corn_i=0, corn_a=org_kociemba_twophase_Corner.values_0(); (corn_i<corn_a.length)&&((corn=corn_a[corn_i])||true); corn_i++)
        {
            cPerm[corn.ordinal_0()] = this.cp[b.cp[corn.ordinal_0()].ordinal_0()];
            var oriA = this.co[b.cp[corn.ordinal_0()].ordinal_0()];
            var oriB = b.co[corn.ordinal_0()];
            var ori = 0;
            {}
            if (oriA < 3 && oriB < 3) 
            {
                ori = _castTObyte((((oriA + oriB)|0)));
                if (ori >= 3) ori = _castTObyte((ori)-(3));
            }
            else if (oriA < 3 && oriB >= 3) 
            {
                ori = _castTObyte((((oriA + oriB)|0)));
                if (ori >= 6) ori = _castTObyte((ori)-(3));
            }
            else if (oriA >= 3 && oriB < 3) 
            {
                ori = _castTObyte((((oriA - oriB)|0)));
                if (ori < 3) ori = _castTObyte((ori)+(3));
            }
            else if (oriA >= 3 && oriB >= 3) 
            {
                ori = _castTObyte((((oriA - oriB)|0)));
                if (ori < 0) ori = _castTObyte((ori)+(3));
            }
            cOri[corn.ordinal_0()] = ori;
        }

        for (var c, c_i=0, c_a=org_kociemba_twophase_Corner.values_0(); (c_i<c_a.length)&&((c=c_a[c_i])||true); c_i++)
        {
            this.cp[c.ordinal_0()] = cPerm[c.ordinal_0()];
            this.co[c.ordinal_0()] = cOri[c.ordinal_0()];
        }

    }
    ,
    edgeMultiply_1: function(b)
    {
        var ePerm = _dim(org_kociemba_twophase_Edge,1,[12,],null);
        var eOri = _dim("B",1,[12,],0);
        for (var edge, edge_i=0, edge_a=org_kociemba_twophase_Edge.values_0(); (edge_i<edge_a.length)&&((edge=edge_a[edge_i])||true); edge_i++)
        {
            ePerm[edge.ordinal_0()] = this.ep[b.ep[edge.ordinal_0()].ordinal_0()];
            eOri[edge.ordinal_0()] = _castTObyte(((((b.eo[edge.ordinal_0()] + this.eo[b.ep[edge.ordinal_0()].ordinal_0()])|0)) % 2));
        }

        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)
        {
            this.ep[e.ordinal_0()] = ePerm[e.ordinal_0()];
            this.eo[e.ordinal_0()] = eOri[e.ordinal_0()];
        }

    }
    ,
    multiply_1: function(b)
    {
        this.cornerMultiply_1(b);
    }
    ,
    invCubieCube_1: function(c)
    {
        for (var edge, edge_i=0, edge_a=org_kociemba_twophase_Edge.values_0(); (edge_i<edge_a.length)&&((edge=edge_a[edge_i])||true); edge_i++)c.ep[this.ep[edge.ordinal_0()].ordinal_0()] = edge;

        for (var edge, edge_i=0, edge_a=org_kociemba_twophase_Edge.values_0(); (edge_i<edge_a.length)&&((edge=edge_a[edge_i])||true); edge_i++)c.eo[edge.ordinal_0()] = this.eo[c.ep[edge.ordinal_0()].ordinal_0()];

        for (var corn, corn_i=0, corn_a=org_kociemba_twophase_Corner.values_0(); (corn_i<corn_a.length)&&((corn=corn_a[corn_i])||true); corn_i++)c.cp[this.cp[corn.ordinal_0()].ordinal_0()] = corn;

        for (var corn, corn_i=0, corn_a=org_kociemba_twophase_Corner.values_0(); (corn_i<corn_a.length)&&((corn=corn_a[corn_i])||true); corn_i++)
        {
            var ori = this.co[c.cp[corn.ordinal_0()].ordinal_0()];
            if (ori >= 3) c.co[corn.ordinal_0()] = ori;

            else {
                c.co[corn.ordinal_0()] = _castTObyte((-(ori)|0));
                if (c.co[corn.ordinal_0()] < 0) c.co[corn.ordinal_0()] = _castTObyte((c.co[corn.ordinal_0()])+(3));
            }
        }

    }
    ,
    getTwist_0: function()
    {
        var ret = 0;
        for (var i = org_kociemba_twophase_Corner.URF.ordinal_0(); i < org_kociemba_twophase_Corner.DRB.ordinal_0(); i=(i +1)|0) ret = _castTOshort((((((3 * ret)|0) + this.co[i])|0)));
        return ret;
    }
    ,
    setTwist_1: function(twist)
    {
        var twistParity = 0;
        for (var i = ((org_kociemba_twophase_Corner.DRB.ordinal_0() - 1)|0); i >= org_kociemba_twophase_Corner.URF.ordinal_0(); i=(i -1)|0) 
        {
            twistParity = (((twistParity)+(this.co[i] = _castTObyte((twist % 3))))|0);
            twist = _castTOshort((twist)/(3));
        }
        this.co[org_kociemba_twophase_Corner.DRB.ordinal_0()] = _castTObyte(((((3 - twistParity % 3)|0)) % 3));
    }
    ,
    getFlip_0: function()
    {
        var ret = 0;
        for (var i = org_kociemba_twophase_Edge.UR.ordinal_0(); i < org_kociemba_twophase_Edge.BR.ordinal_0(); i=(i +1)|0) ret = _castTOshort((((((2 * ret)|0) + this.eo[i])|0)));
        return ret;
    }
    ,
    setFlip_1: function(flip)
    {
        var flipParity = 0;
        for (var i = ((org_kociemba_twophase_Edge.BR.ordinal_0() - 1)|0); i >= org_kociemba_twophase_Edge.UR.ordinal_0(); i=(i -1)|0) 
        {
            flipParity = (((flipParity)+(this.eo[i] = _castTObyte((flip % 2))))|0);
            flip = _castTOshort((flip)/(2));
        }
        this.eo[org_kociemba_twophase_Edge.BR.ordinal_0()] = _castTObyte(((((2 - flipParity % 2)|0)) % 2));
    }
    ,
    cornerParity_0: function()
    {
        var s = 0;
        for (var i = org_kociemba_twophase_Corner.DRB.ordinal_0(); i >= ((org_kociemba_twophase_Corner.URF.ordinal_0() + 1)|0); i=(i -1)|0) for (var j = ((i - 1)|0); j >= org_kociemba_twophase_Corner.URF.ordinal_0(); j=(j -1)|0) if (this.cp[j].ordinal_0() > this.cp[i].ordinal_0()) s=(s +1)|0;
        return _castTOshort((s % 2));
    }
    ,
    edgeParity_0: function()
    {
        var s = 0;
        for (var i = org_kociemba_twophase_Edge.BR.ordinal_0(); i >= ((org_kociemba_twophase_Edge.UR.ordinal_0() + 1)|0); i=(i -1)|0) for (var j = ((i - 1)|0); j >= org_kociemba_twophase_Edge.UR.ordinal_0(); j=(j -1)|0) if (this.ep[j].ordinal_0() > this.ep[i].ordinal_0()) s=(s +1)|0;
        return _castTOshort((s % 2));
    }
    ,
    getFRtoBR_0: function()
    {
        var a = 0, x = 0;
        var edge4 = _dim(org_kociemba_twophase_Edge,1,[4,],null);
        for (var j = org_kociemba_twophase_Edge.BR.ordinal_0(); j >= org_kociemba_twophase_Edge.UR.ordinal_0(); j=(j -1)|0) if (org_kociemba_twophase_Edge.FR.ordinal_0() <= this.ep[j].ordinal_0() && this.ep[j].ordinal_0() <= org_kociemba_twophase_Edge.BR.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(((11 - j)|0),((x + 1)|0))))|0);
            edge4[((3 - (((x=(x +1)|0) -1)|0))|0)] = this.ep[j];
        }
        var b = 0;
        for (var j = 3; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (edge4[j].ordinal_0() !== ((j + 8)|0)) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(edge4,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return _castTOshort((((((24 * a)|0) + b)|0)));
    }
    ,
    setFRtoBR_1: function(idx)
    {
        var x = 0;
        var sliceEdge = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
        var otherEdge = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB]);
        var b = idx % 24;
        var a = _idiv(idx, 24);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)this.ep[e.ordinal_0()] = org_kociemba_twophase_Edge.DB;

        for (var j = 1, k = 0; j < 4; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(sliceEdge,0,j);
        }
        x = 3;
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(((11 - j)|0),((x + 1)|0)))|0) >= 0) 
        {
            this.ep[j] = sliceEdge[((3 - x)|0)];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(((11 - j)|0),(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
        x = 0;
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (this.ep[j] === org_kociemba_twophase_Edge.DB) this.ep[j] = otherEdge[(((x=(x +1)|0) -1)|0)];
    }
    ,
    getURFtoDLF_0: function()
    {
        var a = 0, x = 0;
        var corner6 = _dim(org_kociemba_twophase_Corner,1,[6,],null);
        for (var j = org_kociemba_twophase_Corner.URF.ordinal_0(); j <= org_kociemba_twophase_Corner.DRB.ordinal_0(); j=(j +1)|0) if (this.cp[j].ordinal_0() <= org_kociemba_twophase_Corner.DLF.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0))))|0);
            corner6[(((x=(x +1)|0) -1)|0)] = this.cp[j];
        }
        var b = 0;
        for (var j = 5; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (corner6[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftC_3(corner6,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return _castTOshort((((((720 * a)|0) + b)|0)));
    }
    ,
    setURFtoDLF_1: function(idx)
    {
        var x = 0;
        var corner6 = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF]);
        var otherCorner = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
        var b = idx % 720;
        var a = _idiv(idx, 720);
        for (var c, c_i=0, c_a=org_kociemba_twophase_Corner.values_0(); (c_i<c_a.length)&&((c=c_a[c_i])||true); c_i++)this.cp[c.ordinal_0()] = org_kociemba_twophase_Corner.DRB;

        for (var j = 1, k = 0; j < 6; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightC_3(corner6,0,j);
        }
        x = 5;
        for (var j = org_kociemba_twophase_Corner.DRB.ordinal_0(); j >= 0; j=(j -1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0)))|0) >= 0) 
        {
            this.cp[j] = corner6[x];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(j,(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
        x = 0;
        for (var j = org_kociemba_twophase_Corner.URF.ordinal_0(); j <= org_kociemba_twophase_Corner.DRB.ordinal_0(); j=(j +1)|0) if (this.cp[j] === org_kociemba_twophase_Corner.DRB) this.cp[j] = otherCorner[(((x=(x +1)|0) -1)|0)];
    }
    ,
    getURtoDF_0: function()
    {
        var a = 0, x = 0;
        var edge6 = _dim(org_kociemba_twophase_Edge,1,[6,],null);
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (this.ep[j].ordinal_0() <= org_kociemba_twophase_Edge.DF.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0))))|0);
            edge6[(((x=(x +1)|0) -1)|0)] = this.ep[j];
        }
        var b = 0;
        for (var j = 5; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (edge6[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(edge6,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return ((((720 * a)|0) + b)|0);
    }
    ,
    setURtoDF_1: function(idx)
    {
        var x = 0;
        var edge6 = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF]);
        var otherEdge = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
        var b = idx % 720;
        var a = _idiv(idx, 720);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)this.ep[e.ordinal_0()] = org_kociemba_twophase_Edge.BR;

        for (var j = 1, k = 0; j < 6; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(edge6,0,j);
        }
        x = 5;
        for (var j = org_kociemba_twophase_Edge.BR.ordinal_0(); j >= 0; j=(j -1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0)))|0) >= 0) 
        {
            this.ep[j] = edge6[x];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(j,(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
        x = 0;
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (this.ep[j] === org_kociemba_twophase_Edge.BR) this.ep[j] = otherEdge[(((x=(x +1)|0) -1)|0)];
    }
    ,
    getURtoUL_0: function()
    {
        var a = 0, x = 0;
        var edge3 = _dim(org_kociemba_twophase_Edge,1,[3,],null);
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (this.ep[j].ordinal_0() <= org_kociemba_twophase_Edge.UL.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0))))|0);
            edge3[(((x=(x +1)|0) -1)|0)] = this.ep[j];
        }
        var b = 0;
        for (var j = 2; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (edge3[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(edge3,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return _castTOshort((((((6 * a)|0) + b)|0)));
    }
    ,
    setURtoUL_1: function(idx)
    {
        var x = 0;
        var edge3 = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL]);
        var b = idx % 6;
        var a = _idiv(idx, 6);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)this.ep[e.ordinal_0()] = org_kociemba_twophase_Edge.BR;

        for (var j = 1, k = 0; j < 3; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(edge3,0,j);
        }
        x = 2;
        for (var j = org_kociemba_twophase_Edge.BR.ordinal_0(); j >= 0; j=(j -1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0)))|0) >= 0) 
        {
            this.ep[j] = edge3[x];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(j,(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
    }
    ,
    getUBtoDF_0: function()
    {
        var a = 0, x = 0;
        var edge3 = _dim(org_kociemba_twophase_Edge,1,[3,],null);
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (org_kociemba_twophase_Edge.UB.ordinal_0() <= this.ep[j].ordinal_0() && this.ep[j].ordinal_0() <= org_kociemba_twophase_Edge.DF.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0))))|0);
            edge3[(((x=(x +1)|0) -1)|0)] = this.ep[j];
        }
        var b = 0;
        for (var j = 2; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (edge3[j].ordinal_0() !== ((org_kociemba_twophase_Edge.UB.ordinal_0() + j)|0)) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(edge3,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return _castTOshort((((((6 * a)|0) + b)|0)));
    }
    ,
    setUBtoDF_1: function(idx)
    {
        var x = 0;
        var edge3 = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF]);
        var b = idx % 6;
        var a = _idiv(idx, 6);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)this.ep[e.ordinal_0()] = org_kociemba_twophase_Edge.BR;

        for (var j = 1, k = 0; j < 3; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(edge3,0,j);
        }
        x = 2;
        for (var j = org_kociemba_twophase_Edge.BR.ordinal_0(); j >= 0; j=(j -1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0)))|0) >= 0) 
        {
            this.ep[j] = edge3[x];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(j,(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
    }
    ,
    getURFtoDLB_0: function()
    {
        var perm = _dim(org_kociemba_twophase_Corner,1,[8,],null);
        var b = 0;
        for (var i = 0; i < 8; i=(i +1)|0) perm[i] = this.cp[i];
        for (var j = 7; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (perm[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftC_3(perm,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return b;
    }
    ,
    setURFtoDLB_1: function(idx)
    {
        var perm = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
        var k = 0;
        for (var j = 1; j < 8; j=(j +1)|0) 
        {
            k = idx % (((j + 1)|0));
            idx = _idiv(idx , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightC_3(perm,0,j);
        }
        var x = 7;
        for (var j = 7; j >= 0; j=(j -1)|0) this.cp[j] = perm[(((x=(x -1)|0) +1)|0)];
    }
    ,
    getURtoBR_0: function()
    {
        var perm = _dim(org_kociemba_twophase_Edge,1,[12,],null);
        var b = 0;
        for (var i = 0; i < 12; i=(i +1)|0) perm[i] = this.ep[i];
        for (var j = 11; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (perm[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(perm,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return b;
    }
    ,
    setURtoBR_1: function(idx)
    {
        var perm = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
        var k = 0;
        for (var j = 1; j < 12; j=(j +1)|0) 
        {
            k = idx % (((j + 1)|0));
            idx = _idiv(idx , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(perm,0,j);
        }
        var x = 11;
        for (var j = 11; j >= 0; j=(j -1)|0) this.ep[j] = perm[(((x=(x -1)|0) +1)|0)];
    }
    ,
    verify_0: function()
    {
        var sum = 0;
        var edgeCount = _dim("I",1,[12,],0);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)edgeCount[this.ep[e.ordinal_0()].ordinal_0()]=(edgeCount[this.ep[e.ordinal_0()].ordinal_0()] +1)|0;

        for (var i = 0; i < 12; i=(i +1)|0) if (edgeCount[i] !== 1) return -2;
        for (var i = 0; i < 12; i=(i +1)|0) sum = (((sum)+(this.eo[i]))|0);
        if (sum % 2 !== 0) return -3;
        var cornerCount = _dim("I",1,[8,],0);
        for (var c, c_i=0, c_a=org_kociemba_twophase_Corner.values_0(); (c_i<c_a.length)&&((c=c_a[c_i])||true); c_i++)cornerCount[this.cp[c.ordinal_0()].ordinal_0()]=(cornerCount[this.cp[c.ordinal_0()].ordinal_0()] +1)|0;

        for (var i = 0; i < 8; i=(i +1)|0) if (cornerCount[i] !== 1) return -4;
        sum = 0;
        for (var i = 0; i < 8; i=(i +1)|0) sum = (((sum)+(this.co[i]))|0);
        if (sum % 3 !== 0) return -5;
        if ((this.edgeParity_0() ^ this.cornerParity_0()) !== 0) return -6;
        return 0;
    }
    ,
});
org_kociemba_twophase_CubieCube.cpU = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
org_kociemba_twophase_CubieCube.coU = _arr("B",1,[0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.epU = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
org_kociemba_twophase_CubieCube.eoU = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.cpR = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.DRB,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.UBR]);
org_kociemba_twophase_CubieCube.coR = _arr("B",1,[2,0,0,1,1,0,0,2]);
org_kociemba_twophase_CubieCube.epR = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.BR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.UR]);
org_kociemba_twophase_CubieCube.eoR = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.cpF = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
org_kociemba_twophase_CubieCube.coF = _arr("B",1,[1,2,0,0,2,1,0,0]);
org_kociemba_twophase_CubieCube.epF = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
org_kociemba_twophase_CubieCube.eoF = _arr("B",1,[0,1,0,0,0,1,0,0,1,1,0,0]);
org_kociemba_twophase_CubieCube.cpD = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB,org_kociemba_twophase_Corner.DFR]);
org_kociemba_twophase_CubieCube.coD = _arr("B",1,[0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.epD = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
org_kociemba_twophase_CubieCube.eoD = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.cpL = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DRB]);
org_kociemba_twophase_CubieCube.coL = _arr("B",1,[0,1,2,0,0,2,1,0]);
org_kociemba_twophase_CubieCube.epL = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.BR]);
org_kociemba_twophase_CubieCube.eoL = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.cpB = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DRB,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.DBL]);
org_kociemba_twophase_CubieCube.coB = _arr("B",1,[0,0,1,2,0,0,2,1]);
org_kociemba_twophase_CubieCube.epB = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.BR,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DB]);
org_kociemba_twophase_CubieCube.eoB = _arr("B",1,[0,0,0,1,0,0,0,1,0,0,1,1]);
org_kociemba_twophase_CubieCube.moveCube = _dim(org_kociemba_twophase_CubieCube,1,[6,],null);
{
    org_kociemba_twophase_CubieCube.moveCube[0] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[0].cp = org_kociemba_twophase_CubieCube.cpU;
    org_kociemba_twophase_CubieCube.moveCube[0].co = org_kociemba_twophase_CubieCube.coU;
    org_kociemba_twophase_CubieCube.moveCube[0].ep = org_kociemba_twophase_CubieCube.epU;
    org_kociemba_twophase_CubieCube.moveCube[0].eo = org_kociemba_twophase_CubieCube.eoU;
    org_kociemba_twophase_CubieCube.moveCube[1] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[1].cp = org_kociemba_twophase_CubieCube.cpR;
    org_kociemba_twophase_CubieCube.moveCube[1].co = org_kociemba_twophase_CubieCube.coR;
    org_kociemba_twophase_CubieCube.moveCube[1].ep = org_kociemba_twophase_CubieCube.epR;
    org_kociemba_twophase_CubieCube.moveCube[1].eo = org_kociemba_twophase_CubieCube.eoR;
    org_kociemba_twophase_CubieCube.moveCube[2] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[2].cp = org_kociemba_twophase_CubieCube.cpF;
    org_kociemba_twophase_CubieCube.moveCube[2].co = org_kociemba_twophase_CubieCube.coF;
    org_kociemba_twophase_CubieCube.moveCube[2].ep = org_kociemba_twophase_CubieCube.epF;
    org_kociemba_twophase_CubieCube.moveCube[2].eo = org_kociemba_twophase_CubieCube.eoF;
    org_kociemba_twophase_CubieCube.moveCube[3] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[3].cp = org_kociemba_twophase_CubieCube.cpD;
    org_kociemba_twophase_CubieCube.moveCube[3].co = org_kociemba_twophase_CubieCube.coD;
    org_kociemba_twophase_CubieCube.moveCube[3].ep = org_kociemba_twophase_CubieCube.epD;
    org_kociemba_twophase_CubieCube.moveCube[3].eo = org_kociemba_twophase_CubieCube.eoD;
    org_kociemba_twophase_CubieCube.moveCube[4] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[4].cp = org_kociemba_twophase_CubieCube.cpL;
    org_kociemba_twophase_CubieCube.moveCube[4].co = org_kociemba_twophase_CubieCube.coL;
    org_kociemba_twophase_CubieCube.moveCube[4].ep = org_kociemba_twophase_CubieCube.epL;
    org_kociemba_twophase_CubieCube.moveCube[4].eo = org_kociemba_twophase_CubieCube.eoL;
    org_kociemba_twophase_CubieCube.moveCube[5] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[5].cp = org_kociemba_twophase_CubieCube.cpB;
    org_kociemba_twophase_CubieCube.moveCube[5].co = org_kociemba_twophase_CubieCube.coB;
    org_kociemba_twophase_CubieCube.moveCube[5].ep = org_kociemba_twophase_CubieCube.epB;
    org_kociemba_twophase_CubieCube.moveCube[5].eo = org_kociemba_twophase_CubieCube.eoB;
}
//reference// org/kociemba/twophase/FaceCube
//load// java/lang/Object
//complete// org/kociemba/twophase/Corner
//complete// org/kociemba/twophase/CubieCube
//complete// org/kociemba/twophase/Edge
