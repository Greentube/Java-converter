var org_kociemba_twophase_FaceCube = 
{
    $: function()
    {
        this.f = null;
    }
    ,
    cornerFacelet: null,
    edgeFacelet: null,
    cornerColor: null,
    edgeColor: null,
};
_class(org_kociemba_twophase_FaceCube, java_lang_Object, null,
"org.kociemba.twophase.FaceCube" //replace-me-with-empty-string-for-production//
,{
    _0: function()
    {
        this.f = _dim(org_kociemba_twophase_Color,1,[54,],null);
        {
        }
        var s = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";
        for (var i = 0; i < 54; i=(i +1)|0) this.f[i] = org_kociemba_twophase_Color.valueOf_1(s.substring_2(i,((i + 1)|0)));
        return this;
    }
    ,
    _1: function(cubeString)
    {
        this.f = _dim(org_kociemba_twophase_Color,1,[54,],null);
        {
        }
        for (var i = 0; i < cubeString.length_0(); i=(i +1)|0) this.f[i] = org_kociemba_twophase_Color.valueOf_1(cubeString.substring_2(i,((i + 1)|0)));
        return this;
    }
    ,
    to__String_0: function()
    {
        var s = "";
        for (var i = 0; i < 54; i=(i +1)|0) s += ""+this.f[i].toString_0();
        return s;
    }
    ,
    toCubieCube_0: function()
    {
        var ori = 0;
        var ccRet = (new org_kociemba_twophase_CubieCube.$())._0();
        for (var i = 0; i < 8; i=(i +1)|0) ccRet.cp[i] = org_kociemba_twophase_Corner.URF;
        for (var i = 0; i < 12; i=(i +1)|0) ccRet.ep[i] = org_kociemba_twophase_Edge.UR;
        var col1 = null, col2 = null;
        for (var i, i_i=0, i_a=org_kociemba_twophase_Corner.values_0(); (i_i<i_a.length)&&((i=i_a[i_i])||true); i_i++)
        {
            for (ori = 0; ori < 3; ori=(ori +1)<<24>>24) if (this.f[org_kociemba_twophase_FaceCube.cornerFacelet[i.ordinal_0()][ori].ordinal_0()] === org_kociemba_twophase_Color.U || this.f[org_kociemba_twophase_FaceCube.cornerFacelet[i.ordinal_0()][ori].ordinal_0()] === org_kociemba_twophase_Color.D) break;
            col1 = this.f[org_kociemba_twophase_FaceCube.cornerFacelet[i.ordinal_0()][(((ori + 1)|0)) % 3].ordinal_0()];
            col2 = this.f[org_kociemba_twophase_FaceCube.cornerFacelet[i.ordinal_0()][(((ori + 2)|0)) % 3].ordinal_0()];
            for (var j, j_i=0, j_a=org_kociemba_twophase_Corner.values_0(); (j_i<j_a.length)&&((j=j_a[j_i])||true); j_i++)
            {
                if (col1 === org_kociemba_twophase_FaceCube.cornerColor[j.ordinal_0()][1] && col2 === org_kociemba_twophase_FaceCube.cornerColor[j.ordinal_0()][2]) 
                {
                    ccRet.cp[i.ordinal_0()] = j;
                    ccRet.co[i.ordinal_0()] = _castTObyte((ori % 3));
                    break;
                }
            }

        }

        for (var i, i_i=0, i_a=org_kociemba_twophase_Edge.values_0(); (i_i<i_a.length)&&((i=i_a[i_i])||true); i_i++)for (var j, j_i=0, j_a=org_kociemba_twophase_Edge.values_0(); (j_i<j_a.length)&&((j=j_a[j_i])||true); j_i++)
        {
            if (this.f[org_kociemba_twophase_FaceCube.edgeFacelet[i.ordinal_0()][0].ordinal_0()] === org_kociemba_twophase_FaceCube.edgeColor[j.ordinal_0()][0] && this.f[org_kociemba_twophase_FaceCube.edgeFacelet[i.ordinal_0()][1].ordinal_0()] === org_kociemba_twophase_FaceCube.edgeColor[j.ordinal_0()][1]) 
            {
                ccRet.ep[i.ordinal_0()] = j;
                ccRet.eo[i.ordinal_0()] = 0;
                break;
            }
            if (this.f[org_kociemba_twophase_FaceCube.edgeFacelet[i.ordinal_0()][0].ordinal_0()] === org_kociemba_twophase_FaceCube.edgeColor[j.ordinal_0()][1] && this.f[org_kociemba_twophase_FaceCube.edgeFacelet[i.ordinal_0()][1].ordinal_0()] === org_kociemba_twophase_FaceCube.edgeColor[j.ordinal_0()][0]) 
            {
                ccRet.ep[i.ordinal_0()] = j;
                ccRet.eo[i.ordinal_0()] = 1;
                break;
            }
        }


        return ccRet;
    }
    ,
});
org_kociemba_twophase_FaceCube.cornerFacelet = _arr(org_kociemba_twophase_Facelet,2,[_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U9,org_kociemba_twophase_Facelet.R1,org_kociemba_twophase_Facelet.F3]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U7,org_kociemba_twophase_Facelet.F1,org_kociemba_twophase_Facelet.L3]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U1,org_kociemba_twophase_Facelet.L1,org_kociemba_twophase_Facelet.B3]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U3,org_kociemba_twophase_Facelet.B1,org_kociemba_twophase_Facelet.R3]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D3,org_kociemba_twophase_Facelet.F9,org_kociemba_twophase_Facelet.R7]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D1,org_kociemba_twophase_Facelet.L9,org_kociemba_twophase_Facelet.F7]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D7,org_kociemba_twophase_Facelet.B9,org_kociemba_twophase_Facelet.L7]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D9,org_kociemba_twophase_Facelet.R9,org_kociemba_twophase_Facelet.B7])]);
org_kociemba_twophase_FaceCube.edgeFacelet = _arr(org_kociemba_twophase_Facelet,2,[_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U6,org_kociemba_twophase_Facelet.R2]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U8,org_kociemba_twophase_Facelet.F2]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U4,org_kociemba_twophase_Facelet.L2]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U2,org_kociemba_twophase_Facelet.B2]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D6,org_kociemba_twophase_Facelet.R8]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D2,org_kociemba_twophase_Facelet.F8]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D4,org_kociemba_twophase_Facelet.L8]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D8,org_kociemba_twophase_Facelet.B8]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.F6,org_kociemba_twophase_Facelet.R4]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.F4,org_kociemba_twophase_Facelet.L6]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.B6,org_kociemba_twophase_Facelet.L4]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.B4,org_kociemba_twophase_Facelet.R6])]);
org_kociemba_twophase_FaceCube.cornerColor = _arr(org_kociemba_twophase_Color,2,[_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.R,org_kociemba_twophase_Color.F]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.F,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.L,org_kociemba_twophase_Color.B]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.B,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.F,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.L,org_kociemba_twophase_Color.F]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.B,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.R,org_kociemba_twophase_Color.B])]);
org_kociemba_twophase_FaceCube.edgeColor = _arr(org_kociemba_twophase_Color,2,[_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.F]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.B]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.F]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.B]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.F,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.F,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.B,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.B,org_kociemba_twophase_Color.R])]);
//reference// org/kociemba/twophase/Corner
//reference// org/kociemba/twophase/CubieCube
//reference// org/kociemba/twophase/FaceCube
//reference// org/kociemba/twophase/Edge
//load// java/lang/Object
//complete// org/kociemba/twophase/Color
//complete// org/kociemba/twophase/Facelet
