<template>
  <KatelyBaseLayout>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h1 class="display-4">Copyright & Credits</h1>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h3 class="text-primary">Copyright</h3>
        <p>
          Kately is Free Software and distributed under the terms of the
          <a href="https://github.com/destodasoftware/kately_api/blob/master/LICENSE">MIT License</a>. <br>
          <small>Copyright © 2019 The Destoda Software.</small>
        </p>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-6">
        <img width="300" height="300" src="https://raw.githubusercontent.com/destodasoftware/kately_api/master/kately-github.png"/>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h3 class="text-primary">Credits</h3>
        <dl>
          <dt>Idea</dt>
          <dd>
            Yanwar Solahudin, Ferdian Aryo
          </dd>
          <dt>Maintainer</dt>
          <dd>
            Destoda Software
          </dd>
          <dt>Development</dt>
          <dd>
            Yanwar Solahudin
          </dd>
          <dt>Business Process</dt>
          <dd>
            Kate, Yogi, Genta & Hergy
          </dd>
          <dt>Online-Help & Tips</dt>
          <dd>Nata, Aliz & Kate</dd>
        </dl>
      </div>
    </div>
    <div slot="content" class="row mb-4">
      <div class="col-md-12">
        <h3 class="text-primary">No Waranty</h3>
        <p class="text-dark">
          BECAUSE THE PROGRAM IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY FOR THE PROGRAM,
          TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING
          THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM “AS IS” WITHOUT WARRANTY
          OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
          OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY
          AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME
          THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
        </p>
        <p class="text-dark">
          IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL ANY COPYRIGHT HOLDER,
          OR ANY OTHER PARTY WHO MAY MODIFY AND/OR REDISTRIBUTE THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES,
          INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY
          TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED
          BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER OR OTHER
          PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
      </div>
    </div>
  </KatelyBaseLayout>
</template>

<script>
import KatelyBaseLayout from '@/commons/KatelyBaseLayout'
import MixinHttp from '@/mixins/MixinHttp'

export default {
  name: 'PurchasingMainManager',
  mixins: [
    MixinHttp
  ],
  components: {
    KatelyBaseLayout
  }
}
</script>

<style>

</style>
